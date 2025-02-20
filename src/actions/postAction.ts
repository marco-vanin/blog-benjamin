"use server";

import db from "@/database";
import { eq } from "drizzle-orm";
import { posts } from "@/database/schemas";

export const getAllPosts = async (): Promise<Post[]> => {
  const data = await db.select().from(posts).orderBy(posts.createdAt);
  return data as Post[];
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const data = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return data.length > 0 ? data[0] : null;
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

export const updatePost = async (id: string, params: PostParams) => {
  try {
    const updatedPost = await db
      .update(posts)
      .set({
        ...params,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedPost[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while updating the post",
    };
  }
};
