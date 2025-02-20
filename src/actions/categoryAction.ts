"use server";

import db from "@/database";
import { categories } from "@/database/schemas";

export const getAllCategories = async () => {
  const data = await db.select().from(categories).orderBy(categories.id);
  return data;
};
