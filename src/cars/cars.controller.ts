import { Body, Controller, Get, HttpStatus, Post, Res ,Param,Delete, Patch} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './Models/car.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService) { }

    @Post('/')
    async createCar(@Body() craeteCarDto: CreateCarDto, @Res() res) {
        await this.carsService.createCar(craeteCarDto);
        return res.status(HttpStatus.OK).json({ message: 'Car has been created.' })
    }

    @Get('/')
    async getCars(@Res() res) {
        const cars = await this.carsService.getCars();
        return res.status(HttpStatus.OK).json(cars);
    }
    @Get(':carId')
    async getCar(@Res() res ,@Param('carId') carId:number): Promise<Car>{
        const car = await this.carsService.getCar(carId);
        return res.status(HttpStatus.OK).json(car);
    }
    
    @Patch(':carId')
    updateCar(@Param('carId') carId: number, @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.updateCar(+carId, updateCarDto);
    }
    
    @Delete(':carId')
    async delete( @Res() res,@Param('carId') carId:number):Promise<void>{
        await this.carsService.remove(carId);

        return res.status(HttpStatus.OK).json({message:'The car has been removed.'});
    }

}
