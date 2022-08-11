import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";
// 表名
@Entity('token')
export class UserEntity  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', name: 'access_token'})
  access_token: string;
}