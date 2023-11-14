
"use server"

import User from "@/db/users.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function getUserById(params: any){
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
export async function createUser(userData: CreateUserParams){
    try {
        connectToDatabase()
        

        const user = await User.create({userData})
        
        return user;

    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function updateUser(params: UpdateUserParams){
    try {
        connectToDatabase()
        const {clerkId, updateData, path} =  params

        await User.findOneAndUpdate({clerkId}, updateData,{new:true})
        
        revalidatePath(path)

    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function deleteUser(params: DeleteUserParams){
    try {
        connectToDatabase()
        const {clerkId} =  params

        const deleteUser = await User.findOneAndDelete({clerkId})

        if(!deleteUser){
            throw new Error("User is not found ")
        }
        
        return deleteUser;

    } catch (error) {
        console.log(error)
        throw error;
    }
}