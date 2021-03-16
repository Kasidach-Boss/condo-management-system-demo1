import { Gender } from '../../shared/enum/gender';
import {
    IsString,
    IsEmail,
    IsEnum,
    
} from 'class-validator';

export class CreateUserDto{
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;

    @IsEmail()
    email:string;

    
    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    password: string;

    @IsString()
    birthday: string;

 
}