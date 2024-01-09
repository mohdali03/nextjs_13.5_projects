'use server'
import User from '@/db/users.model';
import { GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from './shared.types.d';

import { connectToDatabase } from "../mongoose"
import { ITag, Tag } from '@/db/tag.model';
import { FilterQuery } from 'mongoose';
import { Question } from '@/db/question.model';

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();
        const { userId, limit = 3 } = params;
        const user = await User.findById(userId)

        if (!user) throw new Error("User not Found")
        return [{ _id: 1, name: "tag1" }
            , {
            _id: 2, name: "tag2"
        }, {
            _id: 3, name: "tag3"

        }]
    }
    catch (error) {
        console.log(error)
        throw error;
    }

}


export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
    try {
  
        connectToDatabase();

        const { tagId, page = 1, pageSize = 10, searchQuery } = params;
        const skipAmount = (page - 1) * pageSize;

        const tagFilter: FilterQuery<ITag> = { _id: tagId };

        const tag = await Tag.findOne(tagFilter).populate({
            path: 'question',
            model: Question,
            match: searchQuery
                ? { title: { $regex: searchQuery, $options: 'i' } }
                : {},
            options: {
                sort: { createdAt: -1 },
                skip: skipAmount,
            limit: pageSize + 1 // +1 to check if there is next page
            },
            populate: [
                { path: 'tags', model: Tag, select: "_id name" },
                { path: 'author', model: User, select: '_id clerkId name picture' }
            ]
        })

        if (!tag) {
            throw new Error('Tag not found');
        }
        console.log(tag)
        // const questions = tag.questions;
        // const questionslength= tag.questions.length;
        // console.log({questionslength})
        const questions = tag.question;
        const questionslength = questions.length;
        console.log({ questionslength });

        return { tagTitle: tag.name, questions  };

    } catch (error) {
        console.log(error)
        throw error;

    }

}