import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Table des utilisateurs
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Table des catégories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

// Table des articles
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  categoryId: serial("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  published: boolean("published").default(false).notNull(),
});

// Table des commentaires
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: serial("post_id").references(() => posts.id),
  userId: serial("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
