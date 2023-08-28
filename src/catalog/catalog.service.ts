import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Catalog } from './schemas/catalog.schema';

@Injectable()
export class CatalogService {

  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,) {}

  async excel2Mongodb(itemArray: Catalog[]) {
    await this.catalogModel.deleteMany();
    await this.catalogModel.insertMany(itemArray).then((result: any) => {
      if (result.length > 0) {
        return { status: 200, message: 'success' }
      }
    });
    // return await createdCatalog.save();
  }

  async findAll() {
    return await this.catalogModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} catalog`;
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }

  private async deleteUpdate() {
    // Elimina
    
    // Genera
  }

}
