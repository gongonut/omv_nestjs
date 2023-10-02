import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles('U')
  @UseGuards(RolesGuard)
  @Post('register')
  create(@Body() userObject: RegisterUserDto) {
    return this.usersService.create(userObject);
  }

  @Post('login')
  login(@Body() userObject: LoginUserDto) {
    return this.usersService.login(userObject);
  }

  @Roles('U')
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // @Roles('U')
  // @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles('U')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: RegisterUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles('U')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
