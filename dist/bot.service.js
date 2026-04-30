"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bot_entity_1 = require("./entities/bot.entity");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
let BotService = class BotService {
    constructor(botModel) {
        this.botModel = botModel;
        this.teacherId = Number(process.env.TEACHER_ID);
        this.userStates = new Map();
        this.bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
        this.bot.setMyCommands([
            { command: '/start', description: 'Boshlash' },
            { command: '/quiz', description: 'Matematika testini boshlash' }
        ]);
        this.bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id;
            const foundedStudent = await this.botModel.findOne({ chatId });
            if (!foundedStudent) {
                await this.botModel.create({ chatId, name: msg.from?.first_name });
                this.bot.sendMessage(chatId, "Siz botdan ro'yxatdan o'tdingiz");
            }
            else {
                this.bot.sendMessage(chatId, "Siz botdan foydalanishingiz mumkin");
            }
        });
        this.bot.onText(/\/quiz/, (msg) => {
            const chatId = msg.chat.id;
            this.userStates.set(chatId, {
                step: 0,
                correct: 0,
                currentAnswer: 0
            });
            this.sendQuestion(chatId);
        });
        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;
            if (!text || text.startsWith('/'))
                return;
            if (chatId !== this.teacherId) {
                const userName = msg.from?.first_name || 'Noma\'lum';
                this.bot.sendMessage(this.teacherId, `${text} ismi: ${userName}`);
            }
            const state = this.userStates.get(chatId);
            if (!state)
                return;
            const userAnswer = Number(text);
            if (userAnswer === state.currentAnswer) {
                state.correct++;
                this.bot.sendMessage(chatId, "✅ To'g'ri!");
            }
            else {
                this.bot.sendMessage(chatId, `❌ Noto'g'ri! To'g'ri javob: ${state.currentAnswer}`);
            }
            state.step++;
            if (state.step >= 10) {
                this.bot.sendMessage(chatId, `🎯 Test tugadi!\n\nTo'g'ri javoblar: ${state.correct} / 10\n\nYana boshlash uchun /quiz`);
                this.userStates.delete(chatId);
            }
            else {
                this.sendQuestion(chatId);
            }
        });
    }
    sendQuestion(chatId) {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const answer = a + b;
        const state = this.userStates.get(chatId);
        state.currentAnswer = answer;
        this.bot.sendMessage(chatId, `🧠 Savol ${state.step + 1}:\n${a} + ${b} = ?`);
    }
    async create(name, chatId) {
        return this.botModel.create({ name, chatId });
    }
    async findAll() {
        return this.botModel.find();
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bot_entity_1.Bot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BotService);
//# sourceMappingURL=bot.service.js.map