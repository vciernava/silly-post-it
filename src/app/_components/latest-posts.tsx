"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export function LatestPosts() {
  const { data: latestPosts } = api.post.getLatest.useQuery();
  const [posts, setPosts] = useState(latestPosts ?? []);

  useEffect(() => {
    setPosts(latestPosts ?? []);
  }, [latestPosts]);

  api.post.onNewPost.useSubscription(undefined, {
    onData({ post }) {
      setPosts((prevPosts) => [post, ...prevPosts]);
    },
    onError(err) {
      console.error('Subscription error:', err);
    }
  });

  return (
    <div className="relative flex flex-col gap-4 h-[600px] w-full max-w-lg border border-gray-400 rounded-lg p-4 overflow-y-auto">
      {posts?.length == 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <p className="text-gray-400 text-xl text-center">Oh no!</p>
          <p className="text-gray-400 text-xl text-center">There are no posts yet :(</p>
        </div>
      ) : (
        posts?.map((post) => (
          <div key={post.id}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs">{post.user.name}</h2>
              <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short'})}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>{post.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
