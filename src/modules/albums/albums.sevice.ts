import { Injectable, NotFoundException } from '@nestjs/common';
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
}
