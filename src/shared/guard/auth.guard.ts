import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";



@Injectable()
export class AutoGuard  implements CanActivate   {
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

    if(token) {
      try {
        // 还得做判断是否和数据库中保存的token一致


        return true
      }catch(e) {
        throw new HttpException(
          '没有授权访问， 请先登入',
          HttpStatus.UNAUTHORIZED
        )
      }
    }else {
      throw new HttpException(
        '没有授权访问， 请先登入',
        HttpStatus.UNAUTHORIZED
      )
    }
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