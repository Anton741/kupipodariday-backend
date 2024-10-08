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
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // @UseGuards(LocalGuard)
  @Post()
  create(@Req() req: any, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto, req.userId);
  }

  @Post(':id/copy')
  copy(@Req() req: any, @Param('id') id: number) {
    return this.wishesService.copyOne(id, req.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.wishesService.findAll();
  }

  @Get('/last')
  lastWish() {
    return this.wishesService.lastEntity();
  }

  @Get('/top')
  topWish() {
    return this.wishesService.firstEntity();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: any) {
    return this.wishesService.findOne({ id }, ['offers', 'owner'], req.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: any,
  ) {
    return this.wishesService.updateOne(id, updateWishDto, req.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: any) {
    return this.wishesService.removeOne(id, req.id);
  }
}
