"use client";

import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center">{children}</li>;
}

function BookmarkButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button onClick={() => setSaved((prev) => !prev)}>
      <Bookmark fill={saved ? "#fff" : "transparent"} />
    </button>
  );
}

function CommentButton() {
  return (
    <button>
      <MessageCircle />
    </button>
  );
}

function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked((prev) => !prev)}>
      <Heart fill={liked ? "#fff" : "transparent"} />
    </button>
  );
}

export default function PostButtons() {
  <div className="bg-slate-500">
    <ul className="flex items-center justify-center gap-4 px-4 py-2">
      <ListItem>
        <LikeButton />
      </ListItem>
      <ListItem>
        <CommentButton />
      </ListItem>
      <ListItem>
        <BookmarkButton />
      </ListItem>
    </ul>
  </div>;
}
