import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Bot, BotDocument } from './entities/bot.entity'
import TelegramBot from "node-telegram-bot-api"

interface UserState {
  step: number
  correct: number
  currentAnswer: number
}

@Injectable()
export class BotService {
  private bot: TelegramBot
  private userStates: Map<number, UserState> = new Map()

  constructor(
    @InjectModel(Bot.name) private botModel: Model<BotDocument>
  ) {
    this.bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })
    
    

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id

      this.bot.sendMessage(chatId, "Matematika testiga xush kelibsiz!\nBoshlash uchun /quiz yozing")
    })

   
    this.bot.onText(/\/quiz/, (msg) => {
      const chatId = msg.chat.id

      this.userStates.set(chatId, {
        step: 0,
        correct: 0,
        currentAnswer: 0
      })

      this.sendQuestion(chatId)
    })

    
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id
      const text = msg.text


      if (text.startsWith('/')) return

      const state = this.userStates.get(chatId)
      if (!state) return

      const userAnswer = Number(text)

      if (userAnswer === state.currentAnswer) {
        state.correct++
        this.bot.sendMessage(chatId, "✅ To‘g‘ri!")
      } else {
        this.bot.sendMessage(chatId, `❌ Noto‘g‘ri! To‘g‘ri javob: ${state.currentAnswer}`)
      }

      state.step++

      if (state.step >= 10) {
        this.bot.sendMessage(
          chatId,
          `🎯 Test tugadi!\n\nTo‘g‘ri javoblar: ${state.correct} / 10\n\nYana boshlash uchun /quiz`
        )

        this.userStates.delete(chatId)
      } else {
        this.sendQuestion(chatId)
      }
    })
  }


  private sendQuestion(chatId: number) {
    const a = Math.floor(Math.random() * 10)
    const b = Math.floor(Math.random() * 10)

    const answer = a + b

    const state = this.userStates.get(chatId)
    state.currentAnswer = answer

    this.bot.sendMessage(chatId, `🧠 Savol ${state.step + 1}:\n${a} + ${b} = ?`)
  }

  async create(name: string, chatId: number) {
    return this.botModel.create({ name, chatId })
  }

  async findAll() {
    return this.botModel.find()
  }
}