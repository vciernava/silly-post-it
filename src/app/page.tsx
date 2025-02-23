
import { LatestPosts } from "~/app/_components/latest-posts";
import { HydrateClient } from "~/trpc/server";
import { User } from "./_components/user";
import { CreatePost } from "./_components/create-post";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <div className="container flex flex-col items-center justify-center px-4 py-16 mx-auto">
          <h1 className="text-6xl font-bold text-center">Silly Post-It Notes</h1>
          <p className="text-gray-400 text-center">
            A place to share your thoughts with the world, using pseudo names.
          </p>
          <User />
          <CreatePost />
          <LatestPosts />
        </div>
      </main>
    </HydrateClient>
  );
}
