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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Req() req: any, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto, req.userId);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query() query: any) {
    return this.offersService.findOne(id, query, {
      user: { wishlists: true, wishes: true },
      item: true,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateOfferDto: UpdateOfferDto) {
  //   return this.offersService.updateOne(id, updateOfferDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.offersService.removeOne(id);
  // }
}
