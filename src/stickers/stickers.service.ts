import { Injectable,HttpException, HttpStatus, } from '@nestjs/common';
import { Sticker } from './Models/sticker.model';
import {CreateStickerDto} from '../stickers/dto/create-sticker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateStickerDto } from './dto/update-sticker.dto';
import {StickerDto} from '../stickers/dto/sticker.dto';

@Injectable()
export class StickersService {
    constructor(@InjectModel(Sticker) private readonly stickerModel: typeof Sticker){}
    createSticker(createStickerDto:CreateStickerDto):Promise<Sticker>{
        return this.stickerModel.create(createStickerDto);
    }

    getStickers(){
        return this.stickerModel.findAll();
    }

    async getSticker(stickerId:number):Promise<Sticker> {
        const sticker = await this.stickerModel.findByPk<Sticker>(stickerId)
        if(!sticker)
            throw new HttpException('Sticker id:'+ stickerId + ' not found.',HttpStatus.NOT_FOUND);

        return this.stickerModel.findOne({where:{stickerId}})

    }

    async updateSticker(stickerId:number, updateStickerDto:UpdateStickerDto){
        const sticker = await this.getSticker(stickerId)
        if (!sticker) {
            throw new HttpException('Sticker id:'+stickerId+' not found.', HttpStatus.NOT_FOUND);
        }
        sticker.type = updateStickerDto.type||sticker.type;
        sticker.expire = updateStickerDto.expire||sticker.expire;
        const data = await sticker.save();
        return new StickerDto(data);

    }

    async remove(stickerId:number):Promise<void>{
        const sticker = await this.getSticker(stickerId)
        if (!sticker) {
            throw new HttpException('Sticker id:'+stickerId+' not found.', HttpStatus.NOT_FOUND);
        }
        await sticker.destroy();
    }
}
