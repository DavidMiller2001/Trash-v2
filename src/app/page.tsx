import { z } from "zod";
import { db } from "~/server/db";
import { insertPostSchema } from "~/server/db/schema";

const mockUrls = [
  "https://utfs.io/f/ece8a4a8-59d1-4e8b-8403-99fc0f6c07fd-er7zyk.png",
  "https://utfs.io/f/4a48f3e8-1388-4147-b2fa-311c898081ac-55m2zr.JPG",
];

export const dynamic = "force-dynamic";

function Post(props: { post: z.infer<typeof insertPostSchema> }) {
  const { post } = props;
  return (
    <div>
      <h2>{post.text}</h2>
      {post.imageUrl !== "" ? (
        <img className="w-48" src={post.imageUrl || ""} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </div>
    </main>
  );
}
