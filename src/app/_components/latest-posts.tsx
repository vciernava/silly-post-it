"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPosts() {
  const [latestPosts] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [content, setContent] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setContent("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPosts ? (
        latestPosts.map((post) => (
          <div key={post.id} className="bg-white/10 p-4 rounded-lg">
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>There are no posts yet.</p>
      )}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ content });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form> */}
    </div>
  );
}
