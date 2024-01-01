// import { createAnswer } from '@/lib/actions/answer.action';
"use server"

import { Question } from "@/db/question.model";
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types"
import Answer  from "@/db/answer.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params : CreateAnswerParams){

    try {
        connectToDatabase();
        const {content, author, question, path} = params;
        const Newanswer = await Answer.create({ content, author, question, path});
        console.log({Newanswer});
        await Question.findByIdAndUpdate(question, {
            $push : { answers: Newanswer._id}
        })

        
        revalidatePath(path);
    } catch (error) {
        
        console.log(error);
    }


}

export const getAnswer = async (params: GetAnswersParams) => {
    
    try {
        connectToDatabase();
        const { questionId } = params; 

        

        
        const answer = await Answer.find({ question: questionId })
        .populate("author", "_id clerkId name picture")
        
        return {answer};
    } catch (error) {
        console.log(error)
        
            throw error;

    }

}