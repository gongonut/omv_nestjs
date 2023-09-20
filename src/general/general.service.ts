import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { InjectModel } from '@nestjs/mongoose';
import { General } from './entities/general.entity';
import { Model } from 'mongoose';

@Injectable()
export class GeneralService {

  constructor(
      @InjectModel(General.name) private generalModel: Model<General>
  ) {}

  /*
  create(createGeneralDto: CreateGeneralDto) {
    return 'This action adds a new general';
  }

  findAll() {
    return `This action returns all general`;
  }
  */

  async findOne() {
    // return await this.generalModel.findById('only').exec();
    return await this.generalModel.find({id: 'only'}).exec();
  }

  async update(updateGeneralDto: UpdateGeneralDto) {
    // return await this.generalModel.findByIdAndUpdate(id, updateQuoteDto, {new: true} );
    return await this.generalModel.replaceOne({ id: 'only' }, updateGeneralDto, { upsert: true }
   );
  }

  /*
  remove(id: number) {
    return `This action removes a #${id} general`;
  }
  */
}
