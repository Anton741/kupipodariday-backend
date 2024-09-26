import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

// @UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findMany(@Query() query: any) {
    return this.usersService.findMany(query);
  }

  @Get('/me')
  findMe(@Req() req: any) {
    console.log(req.user);
    // return this.usersService.findMany(query);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username, false);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Body() query: any) {
    return this.usersService.findOne(id, query);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeOne(id);
  }
}
