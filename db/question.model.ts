import { Schema, models, model, Document } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    content: string;
    tags: Schema.Types.ObjectId[];
    view: number;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId[];
    answers: Schema.Types.ObjectId[];
    CreatedAt: Date;
    UpdateAt: Date;
}

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    view: {
        type: Number,
        default: 0,
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Question = models.Question || model('Question', questionSchema);
