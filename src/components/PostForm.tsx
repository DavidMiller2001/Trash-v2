"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Heart } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  text: z.string().max(280),
  imageUrl: z.string().url(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  // Handle form shenanigans
}

function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked((prev) => !prev)}>
      <Heart fill={liked ? "#fff" : "transparent"} />
    </button>
  );
}

export default function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      imageUrl: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  placeholder="Say Something!"
                  className="rounded-none border bg-transparent"
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="bg-slate-500">
        <ul className="flex items-center px-4 py-2">
          <li className="flex items-center">
            <LikeButton />
          </li>
        </ul>
      </div>
    </>
  );
}
