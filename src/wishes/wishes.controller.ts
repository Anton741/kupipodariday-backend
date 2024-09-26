import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // @UseGuards(LocalGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query() query: any) {
    return this.wishesService.findOne(id, query);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Query() query: any,
  ) {
    const { userId } = query;
    if (!userId) {
      return 'Не передан userId';
    }
    return this.wishesService.updateOne(id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishesService.removeOne(id);
  }
}
