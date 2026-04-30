import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Bot, BotDocument } from './entities/bot.entity'

import TelegramBot from "node-telegram-bot-api"
@Injectable()
export class BotService {
  private bot: TelegramBot
  private teacherId: number = Number(process.env.TEACHERID as string)
  constructor(
    @InjectModel(Bot.name) private botModel: Model<BotDocument>
  ) { 
    this.bot = new TelegramBot(process.env.BOT_TOKEN ,{polling:true})
    this.bot.onText(/\/start/ , (msg) => {
      const chatId: number = msg.chat.id
      
    })
  }

  async create(name: string, chatId: number) {
    return this.botModel.create({ name, chatId })
  }

  async findAll() {
    return this.botModel.find()
  }
}