import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { CatalogModule } from './catalog/catalog.module';
import { UsersModule } from './users/users.module';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRoot(
      // process.env.MONGO_URI_OMV
      `mongodb+srv://${process.env.MONGO_USER}@cluster0.a6otiyi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    ),

    MailerModule.forRoot({
      transport: {
        host: process.env.SMPT_EMAIL_LONG,
        port: process.env.SMPT_PORT,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS_16
        }
      }
      /* 
      transport: {
          host: process.env.SMPT_EMAIL_SHORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS_16
        }
      ,}
      */
    }),
    QuoteModule,
    EmailModule,
    CatalogModule,
    UsersModule,
    GeneralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

/*
imports: [MongooseModule.forRoot(process.env.MONGODB), QuoteModule],
*/
