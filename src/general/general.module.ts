import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { General } from './entities/general.entity';
import { GeneralSchema } from './schemas/general.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: General.name, schema: GeneralSchema }]),
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
  exports: [GeneralService]
})
export class GeneralModule {}
