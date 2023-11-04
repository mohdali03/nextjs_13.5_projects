'use server'

import { connecToDatabase } from "../mongoose"

export async function createQuestion () {
    
    // eslint-disable-next-line no-empty
    try {
        connecToDatabase()
    } catch (error) {
        
    }
}