"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

export function CreatePost() {
    const id = localStorage.getItem("userId");
    const [content, setContent] = useState<string>("");
    const { mutateAsync: createPost } = api.post.create.useMutation();

    if(!id) return;

    return (
        <div className="flex flex-col items-center justify-between gap-2 pb-8 max-w-lg w-full">
            <textarea 
                id="content" 
                name="content" 
                placeholder="What's on your mind?" 
                className="border border-gray-400 focus:border-black outline-none p-2 rounded-lg transition-colors w-full min-h-20" 
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            <button 
                className="bg-black text-white rounded-lg py-2 px-6 hover:opacity-50 transition-opacity"
                onClick={async () => {
                    if(content.length === 0) return;
                    await createPost({ content, userId: id });
                    setContent("");
                }}
            >
                Post it
            </button>
        </div>
    )
}