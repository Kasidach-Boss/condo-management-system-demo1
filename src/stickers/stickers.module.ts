import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sticker } from './Models/sticker.model';
import { StickersService} from './stickers.service';
import { StickersController} from './stickers.controller';

@Module({
    imports :[SequelizeModule.forFeature([Sticker])],
    providers: [StickersService],
    controllers: [StickersController]
})
export class StickersModule {}
