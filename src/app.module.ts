import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SongsModule } from './modules/songs/songs.module';
import { AlbumsModule } from './modules/albums/albums.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    SongsModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
