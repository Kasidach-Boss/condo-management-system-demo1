import {Body, Controller, Delete, Get, Param, Post, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './Models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController{
    constructor(private readonly usersService:UsersService){}

    @Post()
    create(@Body() createUserDto:CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<User>{
        return this.usersService.findOne(id);
    }
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }


    @Delete(':id')
    remove(@Param('id') id:string){
        return this.usersService.remove(id);
    }
}