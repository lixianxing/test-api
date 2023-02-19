import { CanActivate, Controller, ExecutionContext, HttpException, HttpStatus, Injectable, Module } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Connection, Repository } from "typeorm";


@Injectable()
export class AutoService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  
 async QueryToken(token: string) :Promise<boolean> {
  const user = await this.userRepository.findOne({where:{auto: token}})
    console.log(user)
    return false
 }
}









@Injectable()
export class AutoGuard implements CanActivate   {
  
  
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('进入全局权限守卫')

  
    // 获取请求对象
    const request = context.switchToHttp().getRequest()
    // 获取请求头中的token
    const token =  context.switchToRpc().getData().headers['access-token'] ||
    request.headers['access-token'] ||
    request.body.token ||
    request.query.token ||
    request.params.token;

    // 如果是白名单的路由就不拦截直接通过
    if(this.hasUrl(this.urlList, request.url)) {
      return true
    }

    return true
    // const autoService = new AutoService()
    // console.log(autoService.QueryToken(token))

    // if(token) {
      

    //     // // 还得做判断是否和数据库中保存的token一致
    //     if(token !== 'OjzTo2MtZ8duWQvrT7pQGo1LIYAr9MiGMOKI2fC3bIc=') {
    //       throw new HttpException(
    //         'Token已失, 请重新登入',
    //         HttpStatus.UNAUTHORIZED
    //       )
         
    //     }else {
    //       return true
    //     }
    //     // const myDataSource = new DataSource({
    //     //   type: 'mysql',
    //     //   host: 'localhost',
    //     //   port: 3306,
    //     //   username: 'root',
    //     //   password: '123456',
    //     //   database: 'test'
    //     // })
    //     // const user = myDataSource.getRepository(UserEntity)
    //     // const data = await user.findOne({where: {auto: token}})
    //     // console.log(data)
      
    //   }else {
    //   throw new HttpException(
    //     '没有授权访问， 请先登入',
    //     HttpStatus.UNAUTHORIZED
    //   )
    // }
  }

  private urlList:string[]  =[
    '/user/login',
    '/user/signUp'
    
  ]
  private hasUrl(urlList: string[], url: string): boolean {
    let flag: boolean = false;
    if(urlList.indexOf(url) >= 0) {
      flag = true
    }

    return flag
  }
}