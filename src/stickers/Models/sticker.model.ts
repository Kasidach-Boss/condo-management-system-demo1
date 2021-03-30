import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import {Stickers} from '../../shared/enum/sticker';

@Table

export class Sticker extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column
    stickerId:number;

    @Column({type: DataType.ENUM(Stickers.red,Stickers.yellow,Stickers.green)})
    type: string;

}