import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';

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
  ],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule {}
