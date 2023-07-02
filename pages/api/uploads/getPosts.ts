import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';


export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          timestamp: 'desc'
        }
      });
      return res.status(200).json(posts);
    } catch (error) {
      console.log("Database read failed:", error);
      return res.status(500).json({ error: 'Database read failed.' });
    }
  } else {
    return res.status(405).json({ error: 'Invalid request method. Only GET requests are allowed.' });
  }
}