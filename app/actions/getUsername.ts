"use server";

import { ArticlesModel } from "../models/articles";

export async function getUsername(id: any) {
    try {
        const userData = await ArticlesModel.findOne({ _id: id });

        return userData.username;
    } catch (error) {
        console.log(error);
    }
}
