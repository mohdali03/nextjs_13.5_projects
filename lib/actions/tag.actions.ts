'use server'
import User from '@/db/users.model';
import { GetTopInteractedTagsParams } from './shared.types.d';

import { connectToDatabase } from "../mongoose"

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