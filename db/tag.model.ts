import { models, Schema, Document, model } from "mongoose";

export interface ITag extends Document{
    name : string;
    desc: string;
    question: Schema.Types.ObjectId;
    follwers: Schema.Types.ObjectId;
    createOn: Date;
}

const TagSchema = new Schema({
    name:{type: String, required: true, unique: true},
    desc: { type: String, required: true},
    question: [{type : Schema.Types.ObjectId, ref: "Question" }],
    follwers: [{type: Schema.Types.ObjectId, ref: "User" }],
    createOn: {type: Date, default: Date.now}
})

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;