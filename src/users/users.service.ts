import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash, compare } from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private jwtAuthServ: JwtService
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const { password } = registerUserDto;
    const plainToHash = await hash(password, process.env.HASH);
    registerUserDto = {...registerUserDto, password: plainToHash};
    return this.usersModel.create(registerUserDto);
    // return 'This action adds a new user';
  }

  async login(loginUserDto: LoginUserDto) {
    //    console.log('service', registerUserDto );
    const {email, password} = loginUserDto;
    const user = await this.usersModel.findOne({email});
    if(!user) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPass = await compare(password, user.password);
    if (!checkPass) throw new HttpException('INVALID_PASSWORD', 403);

    const payload = {id: user._id, name: user.name, rol: user.rol}
    const token = this.jwtAuthServ.sign(payload);
    const data = {user, token};
    return data;
  }

  async findAll() {
    return await this.usersModel.find().exec();
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
