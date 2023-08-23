import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, UploadedFile } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { extname } from 'path';
import {Workbook} from 'exceljs';
// import { Stream } from 'stream';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';
import * as fs from 'fs';

interface ImgName {row: number, col: number, name: string}

@Controller('catalog')
export class CatalogController {
  imgNamesArray: ImgName[] = [];
  constructor(private readonly catalogService: CatalogService) { }


  @Post('excel2Mongodb')
  @UseInterceptors(
    FileInterceptor(
      'file', {
    
      storage: diskStorage({
        destination: '.catalog/',
        filename: function(req, file, cb) {cb(null, 'catalog.xlsx') }
      }),
    }
    )
  )
  async excel2Mongodb(@UploadedFile() file: Express.Multer.File) {
    fs.rmSync('.catalog/images', { recursive: true, force: true });
    const itemArray: Catalog[] = []; 
    const workbook = new Workbook();
    fs.mkdirSync('.catalog/images');
    await workbook.xlsx.readFile(file.path).then((workbook)=> {
      const worksheetProd = workbook.getWorksheet("producto");
      const worksheetMat = workbook.getWorksheet("materiales");
      const headerRows = 1;
      const prodRowC = worksheetProd.actualRowCount; // determine the range of populated data
      const matRowC = worksheetMat.actualRowCount; // determine the range of populated data

      // Images
      // https://www.cronj.com/blog/upload-image-nodejs-expressjs-using-javascript/
      workbook.model.media.forEach((image) => {
        const rc = image.name.split('_');
        if (rc.length === 3) {}
        this.imgNamesArray.push({row: Number(rc[1]), col: Number(rc[2]), name: `${image.name}.${image.extension}`});
        const data = Buffer.from(image.buffer);
        const filePath = `.catalog/images/${image.name}.${image.extension}`;
        fs.writeFileSync(filePath, data);     
      });
      /*
      for (const image of worksheetMat.getImages()) {
        // console.log('processing image row', image.range.tl.nativeRow, 'col', image.range.tl.nativeCol, 'imageId', image.imageId);
        // fetch the media item with the data (it seems the imageId matches up with m.index?)
        // const img = workbook.model.media.find(m => m.index === image.imageId);
        const rc = image. .name.split('_');
        this.imgNames.push({row:})
        fs.writeFileSync(`${image.range.tl.nativeRow}.${image.range.tl.nativeCol}.${img.name}.${img.extension}`, img.buffer);
      }
      */
      // ..........................................................................................

      for (let i = headerRows + 1; i < prodRowC; i++) {
        // var eventIdCell = range.getCell(i+1, columns.event_id+1);
        // Get Materiales by producto
        const prodCodigo = worksheetProd.getRow(i).getCell(1).value;
        const materiales = this.getMaterialesArray(worksheetMat, headerRows, matRowC, prodCodigo)
        // Make a POST request with form data.
        // Imagenes
        const sm = this.getImageName(i, 4);
        const md = this.getImageName(i, 5);
        const ImageData = {
          'id': 'defa',
          'imagen': {'file_sm': sm, 'file_md': md}
        }
        // ................................................................
        const formData = {
          'familia': worksheetProd.getRow(i).getCell(1).value,
          'descripcion_comercial': worksheetProd.getRow(i).getCell(2).value,
          'descripcion_larga': worksheetProd.getRow(i).getCell(3).value,
          'imagen': ImageData,
          'precio': worksheetProd.getRow(i).getCell(6).value,
          'existencia': worksheetProd.getRow(i).getCell(7).value,
          'subcategoria_1': {
            'jerarquia': worksheetProd.getRow(i).getCell(10).value,
            'nombre': worksheetProd.getRow(i).getCell(11).value,
            'categoria': {
              'jerarquia': worksheetProd.getRow(i).getCell(8).value,
              'nombre': worksheetProd.getRow(i).getCell(9).value,
            }
          },
          'materiales': materiales
        };
        itemArray.push(formData as unknown as Catalog);
      }
      
         // get worksheet, read rows, etc
    });
    return this.catalogService.excel2Mongodb(itemArray);
    // return await this.catalogService.excel2Mongodb(createCatalogDto);
  }

  private getMaterialesArray(matData: any, headerRows, matNumRows, prodCodigo) {
    const result = [];
    
    for (let j = headerRows + 1; j < matNumRows; j++) {
      if (matData.getRow(j).getCell(1).value === prodCodigo) {
  
        const imagelist = [];
        for (let k = 6; k < 10; k++) {
          if (matData.getRow(j).getCell(k).value) {
            const ImageData = {
              'id': j,
              'imagen': {
                'file_md': this.getImageName(j, k)
              }
            }
            imagelist.push(ImageData)
          }
        }
  
        const formData = {
          'codigo': matData.getRow(j).getCell(2).value,
          'color_nombre': matData.getRow(j).getCell(3).value,
          'inventario': matData.getRow(j).getCell(4).value,
          'precio': matData.getRow(j).getCell(5).value,
          'imagenes': imagelist
        }
        result.push(formData)
        
      }
    }
  
    return result;
  }

  private getImageName(row: number, col: number): string {
    const imgNm = this.imgNamesArray.find(img => img.row === row && img.col === col);
    if (imgNm) {return imgNm.name} else {return ''}
  }

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }

}
