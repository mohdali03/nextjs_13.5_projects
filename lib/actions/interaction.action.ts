"use server"


import {Question}  from "@/db/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/db/interaction.model";



export async function viewQuestion(params: ViewQuestionParams) {
    try {
        await connectToDatabase();

        const { questionId, userId } = params;

        // Update view count for the question
        console.log(questionId)
        await Question.findByIdAndUpdate(questionId, { $inc: { view: 1 } });
        
        

        if (userId) {
            const existingInteraction = await Interaction.findOne({
                user: userId,
                action: "view",
                question: questionId,
            })

            if (existingInteraction) return console.log('User has already viewed.')


            await Interaction.create({
                user: userId,
                action: "view",
                question: questionId,
            })
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}