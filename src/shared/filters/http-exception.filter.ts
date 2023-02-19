import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class HttpExcepionFilter implements ExceptionFilter {
  
  catch(exception: HttpException, host: ArgumentsHost) {
     console.log('进入全局异常过滤器')
     const ctx = host.switchToHttp()
     const response = ctx.getResponse<Response>()
     const request = ctx.getRequest<Request>()
     const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

     const message =  exception.getResponse() || null
     let msgLog = {
      statusCode: status, // 系统错误状态
      timestamp: new Date().toISOString(), // 错误日期
      path: request.url, // 错误路由
      message: '请求失败',
      data: message 
     }

     Logger.error(
      '错误信息',
      JSON.stringify(msgLog),
      'HttpExceptionFilter'
     )
    
    response.status(status).json(msgLog)
  }
}