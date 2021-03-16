import { Car } from '../Models/car.model';
export class CarDto{
    readonly brand : string;
    readonly model : string;
    readonly userId : number;

    constructor(car:Car){
        this.brand = car.brand;
        this.model = car.model;
        this.userId = car.userId;
    }
} 