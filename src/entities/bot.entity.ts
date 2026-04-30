import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"


export type BotDocument =  Bot & Document;
@Schema({timestamps: true})
export class Bot {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    chatId: number;
}
 export const BotSchema = SchemaFactory.createForClass(Bot);