import { InferSelectModel } from "drizzle-orm";
import { posts } from "~/server/db/schema";

export default function PostView(props: {
  post: InferSelectModel<typeof posts>;
}) {
  const { post } = props;

  return (
    <div className="flex gap-4">
      <h3>{post.authorId}</h3>
      <p>{post.text}</p>
    </div>
  );
}
