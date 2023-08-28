import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, UploadedFile, Res } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { extname } from 'path';
import { Workbook } from 'exceljs';
// import { Stream } from 'stream';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';
import * as fs from 'fs';
import { Observable, of } from 'rxjs';
import { join } from 'path';


interface ImgName { row: number, col: number, name: string }

@Controller('catalog')
export class CatalogController {
  imgNamesArray: ImgName[] = [];
  constructor(private readonly catalogService: CatalogService) { }
  
  private IMAGEFOLDER = '/images/';
  // private IMAGEGETFOLDER = 'http://localhost:3000/imagename/';

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

   @Get(':imagename')
    getImageByName(@Param('imagename') imagename, @Res() res ): Observable<object> {
      return of(res.sendFile(join(__dirname + this.IMAGEFOLDER, imagename)))
  }

  @Post('excel2Mongodb')
  @UseInterceptors(
    FileInterceptor(
      'file', {

      storage: diskStorage({
        destination: '.catalog/',
        filename: function (req, file, cb) { cb(null, 'catalog.xlsx') }
      }),
    }
    )
  )
  async excel2Mongodb(@UploadedFile() file: Express.Multer.File) {
    
    fs.rmSync(join(__dirname + this.IMAGEFOLDER), { recursive: true, force: true });
    const itemArray: Catalog[] = [];
    const workbook = new Workbook();
    fs.mkdirSync(join(__dirname + this.IMAGEFOLDER));
    await workbook.xlsx.readFile(file.path).then((workbook) => {
      const worksheetProd = workbook.getWorksheet("producto");
      const worksheetMat = workbook.getWorksheet("materiales");
      const headerRows = 2;
      const prodRowC = worksheetProd.actualRowCount; // determine the range of populated data
      const matRowC = worksheetMat.actualRowCount; // determine the range of populated data

      // Images
      // https://www.cronj.com/blog/upload-image-nodejs-expressjs-using-javascript/
      
      workbook.model.media.forEach((image) => {
        /*
        const rc = image.name.split('_');
        if (rc.length === 3) {}
        this.imgNamesArray.push({row: Number(rc[1]), col: Number(rc[2]), name: `${image.name}.${image.extension}`});
        */
        const data = Buffer.from(image.buffer);
        const filePath = join(__dirname + `${this.IMAGEFOLDER}${image.name}.${image.extension}`);
        fs.writeFileSync(filePath, data);
      });


      for (const image of worksheetMat.getImages()) {
        const img = workbook.model.media.find(m => m.name === 'image' + (image.imageId + 1).toString());
        // console.log('processing image row', image.range.tl.nativeRow, 'col', image.range.tl.nativeCol, 'imageId', image.imageId);
        this.imgNamesArray.push({
          row: image.range.tl.nativeRow,
          col: image.range.tl.nativeCol,
          // name: `${this.IMAGEFOLDER}${img.name}.${img.extension}`
          name: `${process.env.IMAGEGETFOLDER}${img.name}.${img.extension}`
        });
      }

      // ..........................................................................................

      for (let i = headerRows; i < prodRowC; i++) {
        // var eventIdCell = range.getCell(i+1, columns.event_id+1);
        // Get Materiales by producto
        const prodCodigo = worksheetProd.getRow(i).getCell(1).value;
        const materiales = this.getMaterialesArray(worksheetMat, headerRows, matRowC, prodCodigo)
        // Make a POST request with form data.
        // Imagenes
        let rc = this.geRowCol(worksheetProd.getRow(i).getCell(4).value.toString());
        const sm = this.getImageName(rc.row, rc.col);
        rc = this.geRowCol(worksheetProd.getRow(i).getCell(5).value.toString());
        const md = this.getImageName(rc.row, rc.col);
        const ImageData = {
          'id': 'defa',
          'imagen': { 'file_sm': sm, 'file_md': md }
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

  private geRowCol(datastr: string): { row: number, col: number } {
    const rc = datastr.split('_');
    if (rc.length === 3) {
      rc[2] = rc[2].split('.')[0];
      return { row: Number(rc[1]), col: Number(rc[2]) };
    }
    return { row: 0, col: 0 };
  }

  private getMaterialesArray(matData: any, headerRows, matNumRows, prodCodigo) {
    const result = [];

    for (let r = headerRows; r < matNumRows; r++) {
      // console.log(matData.getRow(r).getCell(1).value);
      if (matData.getRow(r).getCell(1).value === prodCodigo) {

        const imagelist = [];
        for (let k = 6; k < 10; k++) {
          if (this.getImageName(r, k).length > 0) {
            const ImageData = {
              'id': r,
              'imagen': {
                'file_md': this.getImageName(r, k),
                'file_sm': this.getImageName(r, k),
              }
            }
            imagelist.push(ImageData)
          }
        }

        const formData = {
          'codigo': matData.getRow(r).getCell(2).value,
          'color_nombre': matData.getRow(r).getCell(3).value,
          'inventario': matData.getRow(r).getCell(4).value,
          'precio': matData.getRow(r).getCell(5).value,
          'imagenes': imagelist
        }
        result.push(formData)

      }
    }

    return result;
  }

  private getImageName(row: number, col: number): string {
    col--;
    const imgNm = this.imgNamesArray.find(img => img.row === row && img.col === col);
    if (imgNm) { return imgNm.name } else { return '' }
  }

  

  /*
  @Get(':id')
  async getImageByRoute(@Param('id') id: string) {

  }
  */

  /*
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
  */

}

//nestjs download image?

