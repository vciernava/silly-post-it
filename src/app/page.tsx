import Link from "next/link";

import { LatestPosts } from "~/app/_components/latest-posts";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-bold text-center">Silly Post-It Notes</h1>
          <p className="text-lg text-center">
            A silly post-it note app
          </p>

          <LatestPosts />
        </div>
      </main>
    </HydrateClient>
  );
}
