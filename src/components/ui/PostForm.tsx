"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "./form";
import { Textarea } from "./textarea";

const formSchema = z.object({
  text: z.string().max(280),
  imageUrl: z.string().url(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  // Handle form shenanigans
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
      <div className="bg-slate-500"></div>
    </>
  );
}
