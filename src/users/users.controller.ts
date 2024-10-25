import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  findMe(@Req() req: any) {
    return this.usersService.findOne({ id: req.userId });
  }

  @Get('/me/wishes')
  async findMeWishes(@Req() req: any) {
    const user = await this.usersService.findOne(
      { id: req.userId },
      {
        wishes: {
          offers: { user: { wishes: true, offers: true, wishlists: true } },
          owner: true,
        },
      },
    );
    return user?.wishes ? user?.wishes : [];
  }

  @Patch('/me')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.userId;
    return this.usersService.updateOne(userId, updateUserDto);
  }

  @Post('/find')
  findMany(@Body() query: { query: string }) {
    return this.usersService.findMany(query);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username, false);
  }

  @Get('/:username/wishes')
  async findByUsernameWishes(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username, false, [
      'wishes',
    ]);
    if (user && user?.wishes) {
      return user.wishes;
    }

    return [];
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeOne(id);
  }
}
