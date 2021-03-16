
import { Column, Table, Model,BelongsTo, AutoIncrement, Unique, DataType } from 'sequelize-typescript';
import { Gender } from '../../shared/enum/gender';
import { IsString } from 'class-validator';



@Table
export class User extends Model {
  @Column
  firstName: string;
  @Column
  lastName: string;

  
  @Column
  email:string;

  @Column({type: DataType.ENUM(Gender.female,Gender.male)})
  gender: Gender;

  @IsString()
  @Column
  password: string;

  @IsString()
  @Column
  birthday: string;

  @Column({ defaultValue: true })
  isActive: boolean;
  
}
