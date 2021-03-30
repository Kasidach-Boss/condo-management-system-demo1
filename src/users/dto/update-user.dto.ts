import {
    IsString,
    IsEmail,
    IsEnum,
    
} from 'class-validator';

import { Gender } from '../../shared/enum/gender';
export class UpdateUserDto{
    
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;

    @IsEmail()
    email:string;

    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    username: string;
    
    @IsString()
    password: string;

    @IsString()
    birthday: string;
     
   
    
} 