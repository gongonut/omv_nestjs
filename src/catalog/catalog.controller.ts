import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Res, UploadedFiles, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { extname } from 'path';
import { CellErrorValue, CellFormulaValue, CellHyperlinkValue, CellRichTextValue, CellSharedFormulaValue, Workbook } from 'exceljs';
// import { Stream } from 'stream';
import { Catalog } from './schemas/catalog.schema';
import * as fs from 'fs';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
// import * as sharp from 'sharp'


interface ImgName { row: number, col: number, name: string }

@Controller('catalog')
export class CatalogController {
  imgNamesArray: ImgName[] = [];
  constructor(private readonly catalogService: CatalogService) { }
  private IMAGEFOLDER = '/images/';
  // private IMAGEGETFOLDER = 'http://localhost:3000/catalog/';

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':imagename')
  getImageByName(@Param('imagename') imagename, @Res() res): Observable<object> {
    // console.log(join('./images', imagename));
    const upr = imagename.toUpperCase();
    return of(res.sendFile(join(__dirname + `${this.IMAGEFOLDER}${upr}`)))
  }

  /*
  @Get(':imagename')
  getImageByName(@Param('imagename') imagename, @Res() res): Observable<object> {
    // console.log(join('./images', imagename));
    return of(res.sendFile(join('./images', imagename)))
  }
  */

  @Roles('P')
  @UseGuards(RolesGuard)
  @Post('images2dtbase')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    /*
    if (!fs.existsSync(join(__dirname + this.IMAGEFOLDER))) fs.mkdirSync(join(__dirname + this.IMAGEFOLDER));
    */
    
    fs.rmSync(join(__dirname + this.IMAGEFOLDER), { recursive: true, force: true });
    fs.mkdirSync(join(__dirname + this.IMAGEFOLDER));
    

    let apath = '';
    files.forEach(async image => {
      const upr = image.originalname.toUpperCase();
      apath = join(__dirname + `${this.IMAGEFOLDER}${upr}`);
      fs.writeFileSync(apath, image.buffer);

      /*
      if (image.size > 400000) {
        await sharp(image.buffer)
        .resize({
          fit: sharp.fit.contain,
          width: 600
      })
        .toFile(apath);  
      } else {fs.writeFileSync(apath, image.buffer); }
      */
    })
    return { status: 200, message: apath }
  }

/*
  @Post('images2dtbase')
  @UseInterceptors(FilesInterceptor('files', 10000, {
    storage: diskStorage({
      destination: 'images/',
      filename: function (req, file, cb) { cb(null, file.originalname) }
    })
  }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {

    // files.forEach(image => {
    // const apath = join(__dirname, '..', '..', image.path);
    // const data = fs.readFileSync(apath);
    // fs.writeFileSync(apath, data);
    // })


    return { status: 200, message: 'ok' }
  }
  */


  @Roles('P')
  @UseGuards(RolesGuard)
  @Post('excel2Mongodb')
  @UseInterceptors(
    FileInterceptor(
      'file', {
      storage: diskStorage({
        destination: '.catalog/',
        filename: function (_req, _file, cb) { cb(null, 'catalog.xlsx') }
      }),
    }
    )
  )
  async excel2Mongodb(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    const itemArray: Catalog[] = [];
    const workbook = new Workbook();
    await workbook.xlsx.readFile(file.path).then((workbook) => {
      const worksheetProd = workbook.getWorksheet("producto");
      const worksheetMat = workbook.getWorksheet("materiales");
      const headerRows = 2;
      const prodRowC = worksheetProd.actualRowCount; // determine the range of populated data
      const matRowC = worksheetMat.actualRowCount; // determine the range of populated data
      for (let i = headerRows; i < prodRowC; i++) {
        const prodCodigo = worksheetProd.getRow(i).getCell(1).value;
        const materiales = this.getMaterialesArray(worksheetMat, headerRows, matRowC, prodCodigo)
        // Make a POST request with form data.
        // Imagenes
        let sm = '';
        let md = '';
        if (worksheetProd.getRow(i).getCell(8).value &&
          worksheetProd.getRow(i).getCell(8).value.toString().length > 0) {
          sm = this.getImageName(worksheetProd.getRow(i).getCell(8).value.toString());
        }
        if (worksheetProd.getRow(i).getCell(9).value &&
          worksheetProd.getRow(i).getCell(9).value.toString().length > 0) {
          md = this.getImageName(worksheetProd.getRow(i).getCell(9).value.toString());
        }
        const ImageData = {
          'id': 'defa',
          'imagen': { 'file_sm': sm, 'file_md': md }
        }
        // ................................................................
        const formData = {
          'familia': worksheetProd.getRow(i).getCell(1).value,
          'descripcion_comercial': worksheetProd.getRow(i).getCell(2).value,
          'descripcion_larga': worksheetProd.getRow(i).getCell(3).value,
          'material': worksheetProd.getRow(i).getCell(4).value,
          'medidas_omv': worksheetProd.getRow(i).getCell(5).value,
          'area_impresion': worksheetProd.getRow(i).getCell(6).value,
          'tecnica_marca_descripcion': worksheetProd.getRow(i).getCell(7).value,
          'imagen': ImageData,
          'precio': worksheetProd.getRow(i).getCell(10).value,
          'existencia': worksheetProd.getRow(i).getCell(11).value,
          'subcategoria_1': {
            'jerarquia': worksheetProd.getRow(i).getCell(14).value,
            'nombre': worksheetProd.getRow(i).getCell(15).value,
            'categoria': {
              'jerarquia': worksheetProd.getRow(i).getCell(12).value,
              'nombre': worksheetProd.getRow(i).getCell(13).value,
            }
          },
          'materiales': materiales
        };
        itemArray.push(formData as unknown as Catalog);
      }
      // get worksheet, read rows, etc
    });
    return this.catalogService.excel2Mongodb(itemArray);
  }

  private getMaterialesArray(matData: any, headerRows: number, matNumRows: number, prodCodigo: string | number | boolean | Date | CellErrorValue | CellRichTextValue | CellHyperlinkValue | CellFormulaValue | CellSharedFormulaValue) {
    const result = [];

    for (let r = headerRows; r < matNumRows; r++) {
      // console.log(matData.getRow(r).getCell(1).value);
      if (matData.getRow(r).getCell(1).value === prodCodigo) {

        const imagelist = [];
        for (let k = 6; k < 10; k++) {
          if (matData.getRow(r).getCell(k).value && matData.getRow(r).getCell(k).value.toString().length > 0) {
            const ImageData = {
              'id': r,
              'imagen': {
                'file_md': this.getImageName(matData.getRow(r).getCell(k).value.toString()),
                'file_sm': this.getImageName(matData.getRow(r).getCell(k).value.toString()),
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

  private getImageName(img: string): string {
    return process.env.IMAGEGETFOLDER + img;
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



/*
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
        const data = Buffer.from(image.buffer);
        const filePath = join(__dirname + `${this.IMAGEFOLDER}${image.name}.${image.extension}`);
        fs.writeFileSync(filePath, data);
      });

      this.imgNamesArray = [];
      for (const image of worksheetMat.getImages()) {
        const img = workbook.model.media.find(m => m.name === 'image' + (image.imageId + 1).toString());
        const imgdata: ImgName = {
          row: Number(worksheetMat.getRow(Math.floor(image.range.tl.row) + 1)),
          col: Number(worksheetMat.getColumn(Math.floor(image.range.tl.col) + 1)),
          name: `${this.IMAGEFOLDER}${img.name}.${img.extension}`
        }

        this.imgNamesArray.push(imgdata);
      }

      // ..........................................................................................

      for (let i = headerRows; i < prodRowC; i++) {
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
  }

  private geRowCol(datastr: string): { row: number, col: number } {
    const rc = datastr.split('_');
    if (rc.length === 3) {
      rc[2] = rc[2].split('.')[0];
      return { row: Number(rc[1]), col: Number(rc[2]) };
    }
    return { row: 0, col: 0 };
  }

  private getMaterialesArray(matData: any, headerRows: number, matNumRows: number, prodCodigo: string | number | boolean | Date | CellErrorValue | CellRichTextValue | CellHyperlinkValue | CellFormulaValue | CellSharedFormulaValue) {
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
*/

/*
@Get('filelist/:dir')
  fileStructure(@Param('dir') dir, @Res() res): Observable<object> {
    const strfiles = fs.readdirSync(dir);
    return of(strfiles);
    
  }
*/
/*
  const Results: Array<string> = new Array<string>()
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      console.log(file);
      Results.push(file);
    });
  });
  return of(Results);
  */
/*
  @Get(':imagename')
  getImageByName(@Param('imagename') imagename, @Res() res): Observable<object> {
    // console.log(join('./images', imagename));
    return of(res.sendFile(join('./images', imagename)))
  }
*/