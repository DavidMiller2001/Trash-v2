"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  });
}
