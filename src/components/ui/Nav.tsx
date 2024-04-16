"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";

export default function Nav() {
  const [postFormOpen, setPostFormOpen] = useState(false);

  function PostButton() {
    return (
      <Button
        variant={"ghost"}
        className="w-12 p-0"
        onClick={() => {
          setPostFormOpen((prev) => !prev);
        }}
      >
        <Plus />
      </Button>
    );
  }

  return (
    <>
      <nav className="flex w-full  items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Trash</h2>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              <PostButton />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>

      {postFormOpen && (
        <div>
          <Separator className="mb-4" />
          <div>hello</div>
        </div>
      )}
    </>
  );
}
