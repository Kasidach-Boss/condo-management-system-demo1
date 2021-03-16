import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './Models/car.model';
import { User } from '../users/Models/user.model';


@Module({
  imports :[SequelizeModule.forFeature([Car, User])],
  providers: [CarsService],
  controllers: [CarsController]
})
export class CarsModule {}
