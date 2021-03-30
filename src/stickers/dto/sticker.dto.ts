import { Sticker } from '../Models/sticker.model';

export class StickerDto{
    type:string;
    expire: Date;
    constructor(sticker:Sticker){
        this.type = sticker.type;
        this.expire = sticker.expire;
    }
}