import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listToTree1, randomString } from 'src/utils';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menus.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  // 获取菜单数据列表
  async findAll(body): Promise<MenuEntity[]> {  

    if (body?.menuValue || body?.menuKey) {
      const data = await this.menuRepository.find({
        where: { menuKey: body.menuKey, menuValue: body.menuValue },
      });
      return data
    } else {
      const data = await this.menuRepository.query('select * from menus');
      return listToTree1(data)
    }
  }
  // 添加菜单
  async addMenu(body): Promise<string> {
    body.menuId = randomString();
    let list = await this.menuRepository.insert(body);
    if (list) {
      return '已添加';
    } else {
      return '添加失败!';
    }
  }
  // 删除菜单
  async removeMenu(parma): Promise<string> {
    // console.log(parma);

    // let menuItem: any = await this.menuRepository.findOne({
    //   where: { menuId: parma },
    // });

    // 2
    const removeAll = async (param) => {
      let menuItem: any = await this.menuRepository.findOne({
        where: { menuId: parma },
      });
      await this.menuRepository.remove(menuItem);
      let arr = await this.menuRepository.find({
        where: { fatherMenuId: param },
      });

      arr.forEach(async (e) => {
        await this.menuRepository.remove(e);
      });

      if (menuItem == null) {
        return;
      }
    };

    removeAll(parma);
    return '删除';
    // if (menuItem) {
    //   await this.menuRepository.remove(menuItem);

    //   let arr = await this.menuRepository.find({
    //     where: { fatherMenuId: menuItem.menuId },
    //   });

    //   arr.forEach(async (e) => {
    //     await this.menuRepository.remove(e);
    //   });
    //   return '已删除';
    // } else {
    //   return '删除失败';
    // }
  }

  // 更新菜单
  async updateMenu(Menu: MenuEntity): Promise<string> {
    const menu = await this.menuRepository.findOne({
      where: { menuId: Menu.menuId },
    });
    if (!menu) {
      throw new HttpException(`menuId为 '${Menu.menuId}' 的菜单不存在`, 404);
    }
    const menuItem = await this.menuRepository.update(
      { menuId: Menu.menuId },
      Menu,
    );
    if (menuItem) {
      return '已更新';
    } else {
      return '更新失败';
    }
  }
}
