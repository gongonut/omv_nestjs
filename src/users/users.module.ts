import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './local.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {}
