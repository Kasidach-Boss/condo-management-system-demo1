import { Body, Controller, Delete, Get, Param, Post, Patch, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './Models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController{
    constructor(private readonly usersService:UsersService){}

    @Post('/')
    async create(@Body() createUserDto:CreateUserDto ,@Res() res): Promise<User> {
        await this.usersService.createUser(createUserDto);
        return res.status(HttpStatus.OK).json({message:'User has been created.'});
    }

    @Get()
    async findAll(): Promise<User[]>{
        
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
    async remove(@Res() res,@Param('id') id:string){
        await this.usersService.remove(id);
        return res.status(HttpStatus.OK).json({message:'The User has been removed.'})
    }
}