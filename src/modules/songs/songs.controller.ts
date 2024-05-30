import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.model';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body() createSongDto: Song) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  async findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: Song) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
