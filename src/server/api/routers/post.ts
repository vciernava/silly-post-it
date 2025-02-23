import { type Post, type User } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ee = new EventEmitter();

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ content: z.string().min(1), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          content: input.content,
          userId: input.userId,
        },
        include: { user: true },
      });

      ee.emit("NewPost", post);

      return post;
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return posts ?? null;
  }),
  onNewPost: publicProcedure.subscription(() => {
    return observable<{ post: Post & { user: User } }>((emit) => {
      const onPost = (post: Post & { user: User } ) => {
          emit.next({ post });
      };
    
      ee.on("NewPost", onPost);

      return () => {
        ee.off("NewPost", onPost);
      };
    })
  }),
});