"use server";

import { auth } from "@/auth"; // Import NextAuth
import db from "@/database";
import { users } from "@/database/schemas";
import { eq } from "drizzle-orm";

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const data = await db
    .select({
      id: users.id,
      email: users.email,
      username: users.username,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.user.id!))
    .limit(1);

  if (data.length === 0) {
    return null;
  }

  return data[0];
};
