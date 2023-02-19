import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {UserLoginDTO} from './dto/user.login.dto'
import { UserEntity } from '../entities/user.entity';

@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService,
    ) { }

  @Get('list')
  findAll(): Promise<object> {
    return this.userService.findAll();
  }
  @Post('login')
  loginIn(@Body() body: UserLoginDTO): Promise<object> {
    return this.userService.login(body)
  }
  @Post('signUp')
  signUp(@Body() body: UserLoginDTO) {
    console.log(body)
    
    return this.userService.signUp(body)
  }
}
