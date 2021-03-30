import { Car } from '../Models/car.model';
export class CarDto{
    readonly brand : string;
    readonly model : string;
    readonly userId : number;
    readonly carplate: string;
    readonly color: string;

    constructor(car:Car){
        this.brand = car.brand;
        this.model = car.model;
        this.userId = car.userId;
        this.carplate = car.carplate;
        this.color = car.color;
    }
} 