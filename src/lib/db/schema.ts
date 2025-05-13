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

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  userStyle: text("user_style"),
  roadMap: jsonb("road_map").$type<string[]>(),
  // roadmap is an array of objects with the following structure:
  // {
  //   level: number, // level 1
  //   title: string, // the title of the game
  //   subTopic: string, // the subtopic of the game
  //   isCompleted: boolean, // whether the level is completed
  //   tasks: array of objects with the following structure:
  //   {
  //     type: string, // the type of the task
  //     content: string, // the content of the task
  //     isCompleted: boolean, // whether the task is completed
  //     points: number, // the points of the task out of 100
  //   },
  //   progress: {
  //     skills_mastered: number, // the total points of the game
  //     total_hours: number, // the total hours of the game
  //     total_skills: number, // the total skills of the game
  //     current_skill: number, // the current skill of the game
  //   }
  // }
  createdAt: timestamp("created_at").defaultNow(),
});

export const levels = pgTable("levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  skillId: uuid("skill_id").references(() => skills.id),
  levelNumber: integer("level_number"),
  title: text("title"),
  subTopic: text("sub_topic"),
  isCompleted: boolean("is_completed").default(false),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  levelId: uuid("level_id").references(() => levels.id),
  type: text("type"),
  content: text("content"),
  resourceLink: text("resource_link"),
  isCompleted: boolean("is_completed").default(false),
});

export const userTaskProgress = pgTable("user_task_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  taskId: uuid("task_id").references(() => tasks.id),
  completedAt: timestamp("completed_at"),
});

export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  taskId: uuid("task_id").references(() => tasks.id),
  scheduledTime: timestamp("scheduled_time"),
  googleEventId: text("google_event_id"),
});
