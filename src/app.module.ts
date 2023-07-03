import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}@cluster0.a6otiyi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    ),
    QuoteModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
imports: [MongooseModule.forRoot(process.env.MONGODB), QuoteModule],
*/
