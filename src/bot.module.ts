import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { BotService } from './bot.service'
import { Bot, BotSchema } from './entities/bot.entity'
import { BotController } from './bot.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }])
  ],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}