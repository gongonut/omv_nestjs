import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('assets/images/:imagename')
  getImageByName(@Param('imagename') imagename, @Res() res): Observable<object> {
    // console.log(join(__dirname, '..', 'public/assets/images', imagename));
    return of(res.sendFile(join(__dirname, '..', 'public/assets/images', imagename)))
  }

  /*
  @Get('images/:imagename')
  getCatImage(@Param('imagename') imagename, @Res() res): Observable<object> {
    console.log(join(__dirname, '..', 'public/images', imagename));
    return of(res.sendFile(join(__dirname, '..', 'public/assets/images', imagename)))
  }
  */
  

}
