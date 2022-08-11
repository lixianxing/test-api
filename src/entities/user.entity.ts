import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";
// 表名
@Entity('users')
export class UserEntity  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', name: 'username'})
  username: string;

  @Column({type: 'varchar', name: 'pwd'})
  pwd: string;

  @Column({type: 'varchar', name: 'auto', })
  auto: string;

}