import { Document } from "mongoose";
export type BotDocument = Bot & Document;
export declare class Bot {
    name: string;
    chatId: number;
}
export declare const BotSchema: import("mongoose").Schema<Bot, import("mongoose").Model<Bot, any, any, any, any, any, Bot>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bot, Document<unknown, {}, Bot, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Bot & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Bot, Document<unknown, {}, Bot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    chatId?: import("mongoose").SchemaDefinitionProperty<number, Bot, Document<unknown, {}, Bot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Bot>;
