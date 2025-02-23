"use client";
import { api } from "~/trpc/react";

export function LatestPosts() {
  const {data: latestPosts} = api.post.getLatest.useQuery();

  return (
    <div className="relative h-[600px] w-full max-w-lg border border-gray-400 rounded-lg p-4">
      {latestPosts?.length == 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <p className="text-gray-400 text-xl text-center">Oh no!</p>
          <p className="text-gray-400 text-xl text-center">There are no posts yet :(</p>
        </div>
      ) : (
        latestPosts?.map((post) => (
          <div key={post.id} className="bg-white/10 p-4 rounded-lg">
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
