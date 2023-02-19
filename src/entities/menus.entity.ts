import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";
// 表名
@Entity('menus')
export class MenuEntity  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'varchar', name: 'menuId'})
  menuId: string;

  @Column({type: 'varchar', name: 'icon', nullable: true})
  icon: string;

  @Column({type: 'varchar', name: 'menuKey'})
  menuKey: string;

  @Column({type: 'varchar', name: 'menuValue'})
  menuValue: string;

  @Column({type: 'varchar', name: 'fatherMenuId', nullable: true})
  fatherMenuId: string;

}