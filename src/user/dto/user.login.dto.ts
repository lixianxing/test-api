import {IsNotIn,  MinLength} from 'class-validator'
export class UserLoginDTO {
  @IsNotIn(['', undefined, null], {message: '账号不能为空'})
  username: string

  @MinLength(6, {
    message: '密码长度不能小于6位数'
  })
  pwd: string
}