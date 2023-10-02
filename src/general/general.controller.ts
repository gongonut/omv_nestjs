import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GeneralService } from './general.service';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  /*
  @Post()
  create(@Body() createGeneralDto: CreateGeneralDto) {
    return this.generalService.create(createGeneralDto);
  }

  @Get()
  findAll() {
    return this.generalService.findAll();
  }
  */

  @Get()
  findOne() {
    return this.generalService.findOne();
  }

  @Roles('C')
  @UseGuards(RolesGuard)
  @Put()
  update(@Body() updateGeneralDto: UpdateGeneralDto) {
    return this.generalService.update(updateGeneralDto);
  }

  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalService.remove(+id);
  }
  */

}
