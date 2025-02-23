import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const userRouter = createTRPCRouter({
    getOrCreate: publicProcedure.mutation(async ({ ctx }) => {
        const generatedName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            length: 2
        });

        const user = await ctx.db.user.create({
            data: {
                name: generatedName
            }
        })
    }),
})