import PostView from "~/components/ui/PostView";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => {
          return <PostView key={post.id} post={post} />;
        })}
      </div>
    </main>
  );
}
