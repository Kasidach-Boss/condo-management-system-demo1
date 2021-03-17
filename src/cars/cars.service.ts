import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './Models/car.model';
import { User } from '../users/Models/user.model';
import {CreateCarDto} from '../cars/dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarDto } from './dto/car.dto';





@Injectable()
export class CarsService {
    constructor(@InjectModel(Car) private readonly carModel: typeof Car) { }

    createCar(createCarDto: CreateCarDto): Promise<Car> {
        
        return this.carModel.create(createCarDto);
    }

    getCars() {
        return this.carModel.findAll({ include: [User] })
    }
    
    getCar(carId: number): Promise<Car> {
        return this.carModel.findOne({
            where: {
                carId,
            }
        })
    }
    async updateCar(carId: number,updateCarDto: UpdateCarDto){
        const car = await this.carModel.findByPk<Car>(carId);
        if (!car) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        car.brand = updateCarDto.brand || car.brand;
        car.model = updateCarDto.model || car.model;
        car.userId = updateCarDto.userId || car.userId;
        
        try {
            const data = await car.save();
            return new CarDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    

    }
       
    async remove(carId:number):Promise<void>{
        const car = await this.getCar(carId);
        await car.destroy();
        
    }

}
