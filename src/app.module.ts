import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BotModule } from './bot.module'


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/botdb'),
    BotModule,
  ],
})
export class AppModule {}