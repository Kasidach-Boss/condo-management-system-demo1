import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/Models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports :[SequelizeModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
