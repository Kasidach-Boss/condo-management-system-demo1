import { Injectable, HttpException, HttpStatus, Res, } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lot } from './Models/lot.model';
import {CreateLotDto} from '../lots/dto/create-lot.dto';
import { UpdateLotDto} from '../lots/dto/update-lot.dto';
import {LotDto} from '../lots/dto/lot.dto';
import {Sticker} from '../stickers/Models/sticker.model';

@Injectable()
export class LotsService {
    constructor(@InjectModel(Lot) private readonly lotModel: typeof Lot) { }

createLot(createLotDto: CreateLotDto): Promise<Lot> {    
    
    try {
        return this.lotModel.create(createLotDto);
    } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

getLots() {
    return this.lotModel.findAll({ include: [Sticker]})
}

async getLot(lotId: number): Promise<Lot> {
    const lot = await this.lotModel.findByPk<Lot>(lotId);
    if(lot == null){
        throw new HttpException('Lot id:'+ lotId + ' not found.',HttpStatus.NOT_FOUND);
    }
    
    try {
        return this.lotModel.findOne( {
        
            where: {lotId} , 
            include:[Sticker],
             
        })
    } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
async updateLot(lotId: number,updateLotDto: UpdateLotDto){
    const lot = await this.lotModel.findByPk<Lot>(lotId);
    if (!lot) {
        throw new HttpException('Lot id:'+ lotId+' not found.', HttpStatus.NOT_FOUND);
    }

    lot.floor = updateLotDto.floor || lot.floor;
    lot.stickerId = updateLotDto.stickerId || lot.stickerId;
    try {
        const data = await lot.save();
        return new LotDto(data);
    } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
   
async remove(lotId:number):Promise<void>{
     const lot = await this.getLot(lotId);
    if (!lot) {
        throw new HttpException('Lot id:'+lotId+' not found.', HttpStatus.NOT_FOUND);
    }
    
    try {
        await lot.destroy();
    } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}}
