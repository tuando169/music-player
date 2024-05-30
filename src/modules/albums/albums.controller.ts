import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.sevice';
import { Album } from './album.model';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: Album) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: Album) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
