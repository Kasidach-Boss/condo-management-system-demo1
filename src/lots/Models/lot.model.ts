import { AutoIncrement, Column, PrimaryKey, Table, CreatedAt,UpdatedAt,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sticker } from '../../stickers/Models/sticker.model';

@Table
export class Lot extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column
    lotId:number;
    @Column
    floor:string;

    @ForeignKey(()=>Sticker)
    @Column
    stickerId:number;

    @BelongsTo(()=>Sticker)
    sticker:Sticker;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}