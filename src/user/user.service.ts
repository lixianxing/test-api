import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {token, makeSalt } from '../utils/cryptogram'

@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  // 获取所有用户数据列表
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.query('select * from users');
  }
  // 用户注册
  async signUp(body): Promise<string> {
    body.auto = token(body.username + body.pwd, makeSalt())
    let one = await this.userRepository.find({where:{username: body.username}})
    if(one.length > 0) {
      return '用户已存在, 请重新输入用户名'
    }
    let list = await this.userRepository.insert(body)
    if (list) {

      return '新增成功!';
    } else {
      return '新增失败!';
    }
  }
  // 用户登入
  async login(body): Promise<object> {
    let userResult = await this.userRepository.find({where:{username: body.username}})
    let pwdResult = await this.userRepository.find({where:{pwd: body.pwd}})
    let result = await this.userRepository.find({where:{username: body.username, pwd: body.pwd}})
    if(userResult.length <= 0) {
      throw new HttpException('没有该账户，请重新注册', HttpStatus.BAD_REQUEST);
    }
    if(userResult.length > 0 && pwdResult.length <= 0) {
      throw new HttpException('密码输入错误，请重新输入', HttpStatus.BAD_REQUEST);
    }
    if(result.length > 0 ) {
      return {
        token: result[0].auto
      }
    }
  }
}
