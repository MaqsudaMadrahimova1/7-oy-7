import { Model } from 'mongoose';
import { Bot, BotDocument } from './entities/bot.entity';
export declare class BotService {
    private botModel;
    private bot;
    private userStates;
    constructor(botModel: Model<BotDocument>);
    private sendQuestion;
    create(name: string, chatId: number): Promise<import("mongoose").Document<unknown, {}, BotDocument, {}, import("mongoose").DefaultSchemaOptions> & Bot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, BotDocument, {}, import("mongoose").DefaultSchemaOptions> & Bot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
