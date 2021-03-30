import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { LotsModule } from './lots/lots.module';
import { StickersService } from './stickers/stickers.service';
import { StickersController } from './stickers/stickers.controller';
import { StickersModule } from './stickers/stickers.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'condo-management-system-demo2',
      autoLoadModels: true,
      synchronize: true,
      // models: [User, Sticker]
  }),
    CarsModule,
    UsersModule,
    LotsModule,
    StickersModule,
  ],
  // providers: [StickersService],
  // controllers: [StickersController],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule {}
