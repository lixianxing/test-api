import {IsNotIn,  IsString,  MinDate,  MinLength} from 'class-validator'
export class MenuDTO {
  @IsNotIn(['', undefined, null], {message: '菜单名称不能为空'})
  @IsString()
  menuValue: string
  @IsNotIn(['', undefined, null], {message: '菜单路由不能为空'})
  @IsString({message: 'menuKey是string类型,不能为其他类型'})
  menuKey: string
}