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

  @Patch('add/:id')
  async addToAlbum(
    @Param('id') album_id: string,
    @Body('song_id_list') song_id_list: Array<string>,
  ) {
    return this.albumsService.addToAlbum(album_id, song_id_list);
  }

  @Patch('share/:id')
  async share(
    @Param('id') album_id: string,
    @Body('share_user') user_id: string,
  ) {
    return this.albumsService.share(album_id, user_id);
  }
}
