import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash } from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const { password } = registerUserDto;
    const plainToHash = await hash(password, 10);
    registerUserDto = {...registerUserDto, password: plainToHash};
    return this.usersModel.create(registerUserDto);
    // return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: RegisterUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
