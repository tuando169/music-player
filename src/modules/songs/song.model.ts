import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({ required: true })
  name: string;

  @Prop()
  singer: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  song: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
