"use server";

import db from "@/database";
import { posts } from "@/database/schemas";

export const getAllPosts = async () => {
  const data = await db.select().from(posts).orderBy(posts.createdAt);
  return data;
};

export const createPost = async (params: PostParams) => {
  try {
    const newPost = await db
      .insert(posts)
      .values({
        ...params,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newPost[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the post",
    };
  }
};
