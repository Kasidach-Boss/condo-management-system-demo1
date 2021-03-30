import { Column, Table, Model, BelongsTo, Scopes, CreatedAt, UpdatedAt, Default, PrimaryKey, ForeignKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { User } from '../../users/Models/user.model';
import { Sticker } from '../../stickers/Models/sticker.model';

@Table
export class Car extends Model {
    
    @AutoIncrement
    @PrimaryKey
    @Column
    carId: number;
   

    @Column
    brand: string;

    @Column
    model: string;

    @Column
    carplate: string;

    @Column
    color: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    // @HasOne(()=>Sticker)
    // sticker: Sticker;
}