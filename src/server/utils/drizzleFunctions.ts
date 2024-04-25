"use server";

import { posts, users } from "./../db/schema";
import { z } from "zod";
import { db } from "../db";
import { InferSelectModel } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const postSchema = z.object({
  authorId: z.string(),
  text: z.string().max(280),
  imageUrl: z.string().optional(),
});

export async function uploadPost(post: z.infer<typeof postSchema>) {
  const currUser = await currentUser();

  if (!currUser) {
    throw new Error("Unauthorized!");
  }

  const { id: userId, username, imageUrl, firstName, lastName } = currUser;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user) {
    await db
      .insert(users)
      .values({
        id: userId,
        username: username ?? "",
        imageUrl: imageUrl,
        fullName: `${firstName} ${lastName}`,
      });
  }

  await db.insert(posts).values(post);
}

export async function getUser(id: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });

  return user;
}
