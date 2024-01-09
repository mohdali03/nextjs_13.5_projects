// import { models, Schema, Document, model } from "mongoose";


// export interface IInteraction extends Document{
//     user : Schema.Types.ObjectId;
//     action : string;
//     question : Schema.Types.ObjectId;
//     answer : Schema.Types.ObjectId;
//     tags: Schema.Types.ObjectId[];
//     // followers : Schema.Types.ObjectId,
//     createAt : Date;


// }

// const InteractionSchema = new Schema({
//     user : { type: Schema.Types.ObjectId, ref : 'User' , required: true},
//     action : { type : String, required : true},
//     question : {type : Schema.Types.ObjectId, ref : 'question'},
//     answer : {type : Schema.Types.ObjectId, ref : 'Answer'},
//     tag : [{type : Schema.Types.ObjectId, ref : 'Tag'}],
//     createAt: {type : Date, defualt : Date.now}
// })

// export const Interaction = models.Interaction || model('Interaction', InteractionSchema);


import { Schema, model, models, Document } from 'mongoose';

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // refence to user
  action: string;
  question: Schema.Types.ObjectId; // reference to question
  answer: Schema.Types.ObjectId; // reference to answer
  tags: Schema.Types.ObjectId[]; // reference to tag
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction = models.Interaction || model('Interaction', InteractionSchema);

export default Interaction;