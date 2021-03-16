import {
    IsString,
    IsEmail,
    IsEnum,
    
} from 'class-validator';
import { User } from '../Models/user.model';
import { Gender } from '../../shared/enum/gender';


export class UserDto{
    
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

    

    constructor(user:User){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email= user.email;
        this.gender=user.gender;
        this.password=user.password;
        this.birthday = user.birthday;
    
        
    }
} 