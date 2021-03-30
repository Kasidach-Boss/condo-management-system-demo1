
import { Column, Table, Model, BelongsTo, AutoIncrement, Unique, DataType, HasMany } from 'sequelize-typescript';
import { Gender } from '../../shared/enum/gender';
import { IsString } from 'class-validator';
import { Car } from '../../cars/Models/car.model';



@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  username: string;

  @IsString()
  @Column
  password: string;


  @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
  gender: Gender;

  
  @IsString()
  @Column
  birthday: string;

  @Column({ defaultValue: true })
  isActive: boolean;


  @HasMany(() => Car)
  cars: Car[];
}
