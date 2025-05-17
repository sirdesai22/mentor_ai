import { pgTable, text, timestamp, uuid, jsonb, date, boolean, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  username: text('username'),
  education: text('education'),
  occupation: text('occupation'),
  goals: text('goals'),
  interests: jsonb('interests').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}) 

// skills are the individual skills that a user can have
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  userStyle: text("user_style"),
  roadMap: jsonb("road_map").$type<Array<{ 
    level: number; 
    isCompleted: boolean;
    title: string;
    description: string;
    suggestedQuestions: string[];
    topics: Array<{
      id: string;
      name: string;
      isCompleted: boolean;
      isGenerated: boolean;
      subTopics: string[]; //will have ids to get the subtopics from the genratedData table
    }>
  }>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const genratedData = pgTable("genrated_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  skillId: uuid("skill_id").references(() => skills.id),
  topicId: text("topic_id"),
  data: jsonb("data"),
  createdAt: timestamp("created_at").defaultNow(),
});