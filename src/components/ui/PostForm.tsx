"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./form";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Image as ImageIcon, SendHorizontal } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useUser } from "@clerk/nextjs";
import { uploadPost } from "~/server/utils/drizzleFunctions";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

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

        const { user } = useUser();
        const router = useRouter();

        async function onSubmit(values: z.infer<typeof formSchema>) {
                if (!user?.id) {
                        throw new Error("Unauthorized!");
                }

                const postData = {
                        authorId: user.id,
                        text: values.text,
                        imageUrl: img,
                };

                await uploadPost(postData);
                props.setPostFormOpen(false);
                router.refresh();
        }

        const [img, setImg] = useState("");

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
                                                        </FormItem>
                                                );
                                        }}
                                />

                                {img !== "" && <img src={img} alt="" className="h-[300px] rounded" />}

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
                                                <UploadButton
                                                        endpoint="imageUploader"
                                                        skipPolling
                                                        onClientUploadComplete={(files) => {
                                                                const file = files[0];

                                                                if (file) {
                                                                        setImg(file.url);
                                                                }
                                                        }}
                                                        className=" ut-button:w-full ut-button:bg-transparent ut-button:px-2 ut-button:py-4 hover:ut-button:bg-white hover:ut-button:text-black ut-allowed-content:hidden ut-uploading:bg-red-400 "
                                                        content={{
                                                                button: <ImageIcon />,
                                                        }}
                                                />
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
