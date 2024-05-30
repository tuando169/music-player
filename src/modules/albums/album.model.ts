import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  song_list: Array<string>;

  @Prop({ enum: ['PRIVATE', 'PUBLIC'], default: 'PRIVATE' })
  status: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
