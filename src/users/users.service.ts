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
    // create(createUserDto: CreateUserDto): Promise<User> {
    //     // const user = new User();
        
    //     // // let birthday = moment(createUserDto.birthday);
    //     // // let newDate = new Date(dateString);
    //     // // const salt = genSalt(15);
    //     // user.firstName = createUserDto.firstName;
    //     // user.lastName = createUserDto.lastName;
    //     // user.email = createUserDto.email;
    //     // // user.birthday = birthday.toDate();
    //     // user.birthday = createUserDto.birthday;
    //     // user.gender = createUserDto.gender;
    //     // user.password = createUserDto.password;

    //     return this.userModel.create(createUserDto);
    // }
    createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email= createUserDto.email;
        user.gender=createUserDto.gender;
        user.birthday = createUserDto.birthday;
        
        return  user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({ include: [Car] });
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            }
        })
    }
    async updateUser(id: string,updateUserDto: UpdateUserDto){
        const user = await this.userModel.findByPk<User>(id);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = user.firstName;
        user.lastName = user.lastName;
        user.email= user.email;
        user.gender=user.gender;
        user.birthday = user.birthday;
        
        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    

    }
    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}