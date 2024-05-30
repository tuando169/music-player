import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Album } from './album.model';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async create(createAlbumDto: Album) {
    return this.albumModel.create(createAlbumDto);
  }

  async findAll() {
    return this.albumModel.find({});
  }

  async findOne(id: string) {
    const album = this.albumModel.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async update(id: string, updateAlbumDto: Album) {
    const album = this.albumModel.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    return this.albumModel.updateOne({ _id: id }, { ...updateAlbumDto });
  }

  async remove(id: string) {
    const album = this.albumModel.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    return this.albumModel.deleteOne({ _id: id });
  }

  async addToAlbum(album_id: string, song_id_list: Array<string>) {
    const album = await this.albumModel.findById(album_id);
    if (!album) throw new NotFoundException('Album not found');
    for (const song of song_id_list) {
      if (!album.song_list.includes(song)) album.song_list.push(song);
    }
    return album.save();
  }

  async share(album_id: string, user_id: string) {
    const album = await this.albumModel.findById(album_id);
    if (!album) throw new NotFoundException('Album not found');
    if (album.status == 'PUBLIC')
      throw new BadRequestException('This album is not private');
    if (album.share_users.includes(user_id))
      throw new BadRequestException(
        'This album is already shared with this user',
      );
    album.share_users.push(user_id);
    return album.save();
  }
}
