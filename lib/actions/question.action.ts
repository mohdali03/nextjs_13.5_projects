
"use server"
import { Tag } from '@/db/tag.model';
import { Question } from '@/db/question.model';

import { connectToDatabase } from "../mongoose"
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from './shared.types';
import User from '@/db/users.model';
import { revalidatePath } from 'next/cache';

export const getQuestions = async (params: GetQuestionsParams) => {

    try {
        connectToDatabase()
        const questions = await Question.find({})
            .populate({ path: 'tags', model: Tag })
            .populate({ path: 'author', model: User })
            .sort({ createdAt: -1 })
        return { questions };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function createQuestion(Params: CreateQuestionParams) {

    const { title, content, tags, author, path } = Params
    // eslint-disable-next-line no-empty
    try {
        connectToDatabase()
        // create 
        // Create the question
        const question = await Question.create({
            title,
            content,
            author
        });


        const tagDocuments = []

        // create the tags for user created first or get tag if they already exist so user can edit to that 
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $push: { question: question._id } },
                { upsert: true, new: true }
            )
            tagDocuments.push(existingTag._id)

        }
        await Question.findByIdAndUpdate(
            question._id, {
            $push: { tags: { $each: tagDocuments } }
        }
        )
        revalidatePath(path)


    } catch (error) {



    }
}

export async function getQuestionsbyId(params: GetQuestionByIdParams) {
    try {
        connectToDatabase()

        const { questionId } = params;
        const question = await Question.findById(questionId)
            .populate(
                { path: 'tags', model: Tag }
            )
            .populate({ path: 'author', model: User, select: '_id clerkId name picture' })

        return question
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}


export async function upvoteQuestion(params: QuestionVoteParams) {
    try {
        connectToDatabase();
        const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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


        const question = await Question.findByIdAndUpdate(
            questionId, updateQuery, { new: true }
        )


        if (!question) {
            throw new Error('Question not found')
        }
        revalidatePath(path);



    }
    catch (e) {
        console.log("Error in connecting to the database");
        throw e;
    }

}
export async function downvoteQuestion(params: QuestionVoteParams) {
    try {
        connectToDatabase();
        const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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



        const question = await Question.findByIdAndUpdate(
            questionId, updateQuery, { new: true }
        )

        if (!question) {
            throw new Error('Question not found')
        }
        revalidatePath(path);



    }
    catch (e) {
        console.log("Error in connecting to the database");
        throw e;
    }

}