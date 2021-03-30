import {Lot} from '../Models/lot.model';
export class LotDto{
    
    // readonly lotId:number;
    readonly floor:string;
    readonly stickerId:number;
    constructor(lot:Lot){
        
        this.floor = lot.floor;
        this.stickerId= lot.stickerId;
        
    }

}