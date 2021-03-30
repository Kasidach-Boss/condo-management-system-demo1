import { Controller } from '@nestjs/common';
import { Body, Get, HttpStatus, Post, Res ,Param,Delete, Patch} from '@nestjs/common';
import {CreateLotDto} from '../lots/dto/create-lot.dto';
import { UpdateLotDto} from '../lots/dto/update-lot.dto';
import {LotsService} from '../lots/lots.service';
import {Lot} from './Models/lot.model';
@Controller('lots')
export class LotsController {

    constructor(private readonly lotsService: LotsService) { }

    @Post('/')
    async createLot(@Body() craeteLotDto: CreateLotDto, @Res() res) {
        await this.lotsService.createLot(craeteLotDto);
        return res.status(HttpStatus.OK).json({ message: 'Lot has been created.' })
    }

    @Get('/')
    async getLots(@Res() res) {
        const lots = await this.lotsService.getLots();
        return res.status(HttpStatus.OK).json(lots);
    }
    @Get(':lotId')
    async getLot(@Res() res ,@Param('lotId') lotId:number): Promise<Lot>{
        const lot = await this.lotsService.getLot(lotId);
        return res.status(HttpStatus.OK).json(lot);
    }
    
    @Patch(':lotId')
    updateLot(@Param('lotId') lotId: number, @Body() updateLotDto: UpdateLotDto) {
        return this.lotsService.updateLot(+lotId, updateLotDto);
    }
    
    @Delete(':lotId')
    async delete( @Res() res,@Param('lotId') lotId:number):Promise<void>{
        await this.lotsService.remove(lotId);

        return res.status(HttpStatus.OK).json({message:'The lot has been removed.'});
    }

}