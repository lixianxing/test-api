import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";
import { Observable } from "rxjs";

// 返回体结构
interface Response<T> {
  data: T
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
      // 解析ExecutionContext的数据内容获取到请求体
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      
      console.log('进入全局相应拦截器')

      if(request.params || request.query || request.body) {
        Logger.warn('请求参数')
        Logger.log(`params: ${JSON.stringify(request.params)}`)
        Logger.log(`query: ${JSON.stringify(request.query)}`)
        Logger.log(`body: ${JSON.stringify(request.body)}`)
      }
      // 实现数据的遍历
      return next.handle().pipe(
        map(data => {
          Logger.warn('返回参数')
          Logger.log('SUCCESS'+ JSON.stringify(data))
          return {
            statusCode: HttpStatus.OK,
            timestamp: new Date().toTimeString(), 
            path: request.url,
            message: '请求成功',
            data: data
          }
        })
      )
  }
}

