import { Column, Table, Model, BelongsTo, Scopes, CreatedAt, UpdatedAt, Default, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../../users/Models/user.model';

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
}