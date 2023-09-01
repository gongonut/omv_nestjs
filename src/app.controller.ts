import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('webpage')
  root(@Res() response): void {
    // the homepage will load our index.html which contains angular logic
    console.log(join(__dirname, '..', 'page/index.html'));
    response.sendFile(join(__dirname, '..', 'page/index.html'));
  }
}
