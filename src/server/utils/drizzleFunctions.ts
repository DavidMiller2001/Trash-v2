"use server";

import { posts } from "./../db/schema";
import { z } from "zod";
import { db } from "../db";

const postSchema = z.object({
  authorId: z.string(),
  text: z.string().max(280),
  imageUrl: z.string().optional(),
});

export async function uploadPost(post: z.infer<typeof postSchema>) {
  await db.insert(posts).values(post);
}
