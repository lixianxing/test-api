import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExcepionFilter } from './shared/filters/http-exception.filter';
import { AutoGuard } from './shared/guard/auth.guard';
import { ValidationPipe } from './shared/pipe/validation.pipe';
import { XMLMiddleware } from './shared/middleware/xml.middleware';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册通用验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局注册通用异常过滤器
  app.useGlobalFilters(new HttpExcepionFilter());
  // 全局注册xml支持中间件
  app.use(new XMLMiddleware().use);
  // 全局注册权限守卫
  app.useGlobalGuards(new AutoGuard());
  // 全局注册相应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
