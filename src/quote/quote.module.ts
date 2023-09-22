/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './schemas/quote.schema';
import { EmailModule } from 'src/email/email.module';
import { GeneralModule } from 'src/general/general.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    EmailModule,
    GeneralModule
  ],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
