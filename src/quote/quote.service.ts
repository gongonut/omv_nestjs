import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './schemas/quote.schema';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<Quote>,
    @Inject(EmailService) private readonly emails: EmailService
    ) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const createdQuote = new this.quoteModel(createQuoteDto);
    return await createdQuote.save();
  }

  async findAll(): Promise<Quote[]> {
    return await this.quoteModel.find().exec();
  }

  async findOne(id: string) {
    return await this.quoteModel.findById(id).exec();
  }
 
  async update(id: string, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    if (updateQuoteDto.status === 4) {
      this.emails.quoteEmail(updateQuoteDto);
    }
    return await this.quoteModel.findByIdAndUpdate(id, updateQuoteDto, {new: true} );
  }

  async remove(id: string) {

    return await this.quoteModel.findByIdAndRemove(id);
  }
}
