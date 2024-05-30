import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Song } from './song.model';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async create(createSongDto: Song) {
    return this.songModel.create(createSongDto);
  }

  async findAll() {
    return this.songModel.find({});
  }

  async findOne(id: string) {
    const user = this.songModel.findById(id);
    if (!user) throw new NotFoundException('Song not found');
    return user;
  }

  async update(id: string, updateSongDto: Song) {
    const user = this.songModel.findById(id);
    if (!user) throw new NotFoundException('Song not found');
    return this.songModel.updateOne({ _id: id }, { ...updateSongDto });
  }

  async remove(id: string) {
    const user = this.songModel.findById(id);
    if (!user) throw new NotFoundException('Song not found');
    return this.songModel.deleteOne({ _id: id });
  }
}
