import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/ece8a4a8-59d1-4e8b-8403-99fc0f6c07fd-er7zyk.png",
  "https://utfs.io/f/4a48f3e8-1388-4147-b2fa-311c898081ac-55m2zr.JPG",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => {
          return <div key={post.id}>{post.name}</div>;
        })}
        {mockImages.map((image) => {
          return (
            <div key={image.id} className="w-48">
              <img src={image.url} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
