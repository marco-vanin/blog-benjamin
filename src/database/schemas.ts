import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

const rolesEnum = pgEnum("role", ["USER", "ADMIN"]);

// Table des utilisateurs
export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: rolesEnum().default("USER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Table des catégories
export const categories = pgTable("categories", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: text("name").unique().notNull(),
});

// Table des articles
export const posts = pgTable("posts", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  published: boolean("published").default(false).notNull(),
});

// Table des commentaires
export const comments = pgTable("comments", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  postId: uuid("post_id").references(() => posts.id),
  userId: uuid("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
