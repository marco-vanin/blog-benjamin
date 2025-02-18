"use server";

import db from "@/database";
import { posts } from "@/database/schemas";

export const getAllPosts = async () => {
  const data = await db.select().from(posts).orderBy(posts.createdAt);
  return data;
};
