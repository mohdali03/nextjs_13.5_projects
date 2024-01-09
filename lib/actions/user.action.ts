import { FilterQuery } from 'mongoose';
"use server"
import { connectToDatabase } from "../mongoose"
// import { ,  } from './shared.types.d';

import User from "@/db/users.model";
import { CreateUserParams, DeleteUserParams, UpdateUserParams, GetAllUsersParams, ToggleSaveQuestionParams, GetSavedQuestionsParams } from "./shared.types";
import { revalidatePath } from 'next/cache';
import { Question } from "@/db/question.model";
import { Tag } from '@/db/tag.model';


export async function getUserById(params: any) {
    try {
        connectToDatabase()
        const { userId } = params;
        const user = await User.findOne({
            clerkId: userId
        })
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase()

        const newUser = await User.create(userData);
        return newUser;


    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase()
        const { clerkId, updateData, path } = params

        await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

        revalidatePath(path)

    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase()
        const { clerkId } = params

        const user = await User.findOneAndDelete({ clerkId });

        if (!user) {
            throw new Error('User not found');
        }
        await Question.deleteMany({ author: user._id });

        return deleteUser;

    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function GetAllUser(params: GetAllUsersParams) {
    try {
        connectToDatabase();

        // const { page = 1, pagesize = 20, filter, searchQuery}= params;
        const users = await User.find({}).sort({ createdAt: -1 })
        return { users };
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// export async function GetAllUser(params: GetAllUsersParams  ) {
//     try {
//         connectToDatabase();    
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }    
// }

export async function toggleSavedQuestion(params: ToggleSaveQuestionParams) {

    try {
        connectToDatabase();

        const { userId, questionId, path } = params;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User is not found")

        }

        const isQuesiton = user.saved.includes(questionId)
        console.log(isQuesiton)

        if (isQuesiton) {
            await User.findByIdAndUpdate(userId,
                { $pull: { saved: questionId } },
                {
                    new: true
                })
        }
        else {

            await User.findByIdAndUpdate(userId,
                { $addToSet: { saved: questionId } },
                {
                    new: true
                })
        }
        console.log(isQuesiton)
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function getSavedQuestions(params: GetSavedQuestionsParams) {
    try {
        connectToDatabase();
        const { clerkId, page = 1, pageSize = 13, filter, searchQuery } = params;


        const query: FilterQuery<typeof Question> = searchQuery ? {
            title: { $regex: new RegExp(searchQuery, 'i') }
        } : {};


        const user = await User
        .findOne({ clerkId })
            .populate({
                path: 'saved',
                match: query,
                options: {
                    sort: { createdAt: -1 }
                },
                populate: [
                    { path: 'tags', model: Tag, select: "_id name" },
                    { path: 'author', model: User, select: "_id clerkId name picture" },

                ]
            })


        // const user = await User
        //     .findOne({ clerkId })
        //     .populate({
        //         path: 'saved',
        //         match: query,
        //         options: {
        //             sort: { createdAt: -1 }
        //         },
        //         populate: [
        //             { path: 'tags', model: Tag, select: "_id name" },
        //             { path: 'author', model: User, select: '_id clerkId name picture' }
        //         ]
        //     })
        const savedQuestion = user.saved;

        return { question: savedQuestion }


    } catch (error) {
        console.log(error)
        throw error;
    }
}