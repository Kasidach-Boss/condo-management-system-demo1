import { Module } from '@nestjs/common';
import { LotsController } from './lots.controller';
import { LotsService } from './lots.service';
import { Lot } from './Models/lot.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports :[SequelizeModule.forFeature([Lot])],
  controllers: [LotsController],
  providers: [LotsService]
})
export class LotsModule {}
