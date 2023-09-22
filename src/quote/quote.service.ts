import { Model } from 'mongoose';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './schemas/quote.schema';
import { EmailService } from 'src/email/email.service';
import { GeneralService } from 'src/general/general.service';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<Quote>,
    @Inject(EmailService) private readonly emails: EmailService,
    @Inject(GeneralService) private generalService: GeneralService
    ) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const createdQuote = new this.quoteModel(createQuoteDto);
    return await createdQuote.save();
  }

  async findAll(): Promise<Quote[]> {
    return await this.quoteModel.find().exec();
  }

  async findByFilter(status: number, agent_id: string): Promise<Quote[]> {
    if (!status) throw new HttpException('EMPTY_DATA', 401);
    if (status == 2) return await this.quoteModel.find({status, agent_id}).exec();
    return await this.quoteModel.find({status}).exec();
  }

  async findOne(id: string) {
    return await this.quoteModel.findById({consecutive: id}).exec();
  }
 
  async update(id: string, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    if (!updateQuoteDto.consecutive || updateQuoteDto.consecutive.length === 0) {
      updateQuoteDto.consecutive = (await this.generalService.consecutive()).toString().padStart(8, '0');
    }
    // si user no es el mismo, no lo actualiza

    if (updateQuoteDto.status === 4) {
      this.emails.quoteEmail(updateQuoteDto);
    }
    return await this.quoteModel.findByIdAndUpdate(id, updateQuoteDto, {new: true} );
  }

  async remove(id: string) {

    return await this.quoteModel.findByIdAndRemove(id);
  }
}
