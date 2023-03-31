import prisma from "db"
import NextCors from "nextjs-cors";
import validGames from "@/lib/validGames";

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    res.status(200).json(validGames)
}