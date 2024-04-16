"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "./form";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Image, SendHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  text: z.string().max(280),
  imageUrl: z.string().url(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  // Handle form shenanigans
}

export default function PostForm(props: {
  setPostFormOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      imageUrl: "",
    },
  });

  const { setPostFormOpen } = props;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  placeholder="Say Something!"
                  className="min-h-48 rounded-none border bg-transparent pl-4 pr-48 pt-4"
                />
              </FormItem>
            )}
          />
          <ul className="absolute bottom-2 right-4 flex gap-2">
            <li>
              <Button
                variant={"secondary"}
                onClick={() => setPostFormOpen(false)}
              >
                Cancel
              </Button>
            </li>
            <li>
              <Button size="icon">
                <Image />
              </Button>
            </li>
            <li>
              <Button size="icon">
                <SendHorizontal />
              </Button>
            </li>
          </ul>
        </form>
      </Form>
    </>
  );
}
