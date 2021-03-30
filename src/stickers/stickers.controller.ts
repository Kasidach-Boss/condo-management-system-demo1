import { Body, Controller, Post, Get,  Res, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { Sticker } from './Models/sticker.model';
import { UpdateStickerDto } from './dto/update-sticker.dto';

@Controller('stickers')
export class StickersController {
    constructor(private readonly stickersService:StickersService){}

    @Post('/')
    async createSticker(@Body() createStickerDto:CreateStickerDto, @Res() res){
        await this.stickersService.createSticker(createStickerDto);
        return res.status(HttpStatus.OK).json({Message:'Sticker has been created.'})
    }

    @Get('/')
    async getStickers(@Res() res){
        const sticker=await this.stickersService.getStickers();
        return res.status(HttpStatus.OK).json(sticker);
    }

    @Get(':stickerId')
    async getSticker(@Res() res, @Param('stickerId') stickerId:number):Promise<Sticker>{
        const sticker = await this.stickersService.getSticker(stickerId);
        return res.status(HttpStatus.OK).json(sticker);
    }

    @Patch(':stickerId')
    async updateSticker(@Param('stickerId') stickerId:number, @Body() updateStickerDto:UpdateStickerDto){
        return this.stickersService.updateSticker(+stickerId, updateStickerDto)
    }

    @Delete(':stickerId')
    async deleteSticker(@Res() res, @Param('stickerId') stickerId:number):Promise<void>{
        await this.stickersService.remove(stickerId)
        return res.status(HttpStatus.OK).json({message:'The sticker:'+stickerId+' has been removed.'});
    }

}
