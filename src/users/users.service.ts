import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Models/user.model';
import { Car } from '../cars/Models/car.model';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserDto} from '../users/dto/user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }
    
    createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email= createUserDto.email;
        user.gender=createUserDto.gender;
        user.birthday = createUserDto.birthday;
        user.password = createUserDto.password;
        
        try {
            return  user.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<User[]> {
        
        try {
            return this.userModel.findAll({ include: [Car] });
       } catch (err) {
           throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
       }
        
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findByPk<User>(id);
        if (user == null) {
            throw new HttpException('User id:'+id+' not found.', HttpStatus.NOT_FOUND);
        }
        
        try {
            return this.userModel.findOne({
                include:[Car],
                where: { id,}
            })
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id: string,updateUserDto: UpdateUserDto){
        const user = await this.userModel.findByPk<User>(id);
        if (user == null) {
            throw new HttpException('User id:'+id+' not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName|| user.lastName;
        user.email= updateUserDto.email || user.email;
        user.gender= updateUserDto.gender || user.gender;
        user.birthday = updateUserDto.birthday || user.birthday;
        user.password = updateUserDto.password || user.password;
        
        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    

    }
    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
       
        if (user == null) {
            throw new HttpException('User id:'+id+' not found.', HttpStatus.NOT_FOUND);
        }
        
        try {
             await user.destroy();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}