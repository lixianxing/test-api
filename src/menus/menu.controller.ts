import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDTO } from './dto/menu.dto';
import { MenuEntity } from '../entities/menus.entity';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('list')
  findAll(@Body() body: object): Promise<object[]> {
    return this.menuService.findAll(body);
  }

  @Post('addMenu')
  addMenu(@Body() body: MenuDTO) {
    return this.menuService.addMenu(body);
  }

  @Get('removeMenu')
  removeMenu(@Query('id') id: string) {
    return this.menuService.removeMenu(id);
  }

  @Put(':id')
  async updateCat(@Body() Menu: MenuEntity) {
    return await this.menuService.updateMenu(Menu);
  }
}
