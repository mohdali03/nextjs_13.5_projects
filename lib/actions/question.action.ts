// import { Question } from './../../db/question.model';
"use server"
import { Tag } from '@/db/tag.model';
import { Question } from '@/db/question.model';

import { connectToDatabase } from "../mongoose"
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import User from '@/db/users.model';
import { revalidatePath } from 'next/cache';

export const getQuestions = async (params: GetQuestionsParams) => {

    try {
        connectToDatabase()
        const questions = await Question.find({})
            .populate({ path: 'tags', model: Tag })
            .populate({ path: 'author', model: User })
            .sort({ createdAt : -1})
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
                { $setOnInsert: { name: tag }, $push: { questions: question._id } },
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