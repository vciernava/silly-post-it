import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { z } from "zod";

export const userRouter = createTRPCRouter({
    create: publicProcedure
    .mutation(async ({ ctx }) => {
        const generatedName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            separator: '-',
            length: 2
        });

        console.log(generatedName);

        return await ctx.db.user.create({
            data: {
                name: generatedName
            }
        });
    }),
    get: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
            where: {
                id: input.id
            }
        });

        return user ?? null;
    }),
})