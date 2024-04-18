"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Image, SendHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Please do not leave empty!" })
    .max(280, { message: "maximum 280 characters!" }),
  imageUrl: z.string().optional(),
});

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-36 rounded-none bg-transparent"
                    placeholder="Say something!"
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            );
          }}
        />

        <ul className="absolute bottom-4 right-4 flex gap-2">
          <li>
            <Button
              variant="ghost"
              onClick={() => {
                props.setPostFormOpen(false);
              }}
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button type="submit" variant="ghost" size="icon">
              <Image />
            </Button>
          </li>
          <li>
            <Button type="submit" variant="ghost" size="icon">
              <SendHorizontal />
            </Button>
          </li>
        </ul>
      </form>
    </Form>
  );
}
