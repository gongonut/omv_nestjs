import { HttpException, Injectable, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash, compare } from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private jwtAuthServ: JwtService
  ) {}

  @Roles('U')
  @UseGuards(RolesGuard)
  async create(registerUserDto: RegisterUserDto) {
    const { password } = registerUserDto;
    const plainToHash = await hash(password, Number(process.env.HASH));
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

  async findOne(email: string) {
    return await this.usersModel.findOne({email: email}).exec();
  }

  async update(id: string, updateUserDto: RegisterUserDto) {
    // const { rol } = updateUserDto;
    const filter = { '_id': id };
    const update = {
      'name': updateUserDto.name,
      'phone': updateUserDto.phone,
      'city': updateUserDto.city,
      'rol': updateUserDto.rol };
    
    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    await this.usersModel.findOneAndUpdate(filter, update, {returnOriginal: false});
    /*
    const { rol } = updateUserDto;
    const fields = [{propName: 'rol', value: rol}];
    return await this.usersModel.findByIdAndUpdate(id, { $set: fields }, {new: true} );
    */
  }

  async remove(id: string) {
    return await this.usersModel.findByIdAndRemove(id);
  }
}
