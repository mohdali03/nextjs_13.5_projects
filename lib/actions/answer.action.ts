// import { createAnswer } from '@/lib/actions/answer.action';
"use server"

import { Question } from "@/db/question.model";
import { connectToDatabase } from "../mongoose"
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types"
import Answer from "@/db/answer.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {

    try {
        connectToDatabase();
        const { content, author,question, path } = params;
        const Newanswer = await Answer.create({ content, author, question, path });
        console.log({ Newanswer });
        await Question.findByIdAndUpdate(question, {
            $push: { answers: Newanswer._id }
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




        const answer = await Answer.find({ answer: questionId })
            .populate("author", "_id clerkId name picture")

        return { answer };
    } catch (error) {
        console.log(error)

        throw error;

    }

}

export async function upvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();
        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if (hasupVoted) {
            updateQuery = { $pull: { upvotes: userId } }

        } else if (hasdownVoted) {
            updateQuery = {
                $pull: { downvotes: userId },
                $push: { upvotes: userId }
            }

        }
        else {
            updateQuery = { $addToSet: { upvotes: userId } }
        }


        const answer = await Answer.findByIdAndUpdate(
            answerId, updateQuery, { new: true }
        )


        if (!answer) {
            throw new Error('Question not found')
        }
        revalidatePath(path);



    }
    catch (e) {
        console.log("Error in connecting to the database");
        throw e;
    }

}
export async function downvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();
        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if (hasdownVoted) {
            updateQuery = { $pull: { downvotes: userId } }

        } else if (hasupVoted) {
            updateQuery = {
                $pull: { upvotes: userId },

                $push: { downvotes: userId }
            }
        }
        else {
            updateQuery = { $addToSet: { downvotes: userId } }
        }



        const answer = await Answer.findByIdAndUpdate(
            answerId, updateQuery, { new: true }
        )

        if (!answer) {
            throw new Error('Answer not found')
        }
        revalidatePath(path);



    }
    catch (e) {
        console.log("Error in connecting to the database");
        throw e;
    }

}