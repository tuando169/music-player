import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: User) {
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.find({});
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = this.userModel.findOne({ email: email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: User) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userModel.updateOne({ _id: id }, { ...updateUserDto });
  }

  async remove(id: string) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userModel.deleteOne({ _id: id });
  }
}
