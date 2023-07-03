import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          likes: 'desc'
        }
      });

      const dates = Array.from(new Set(posts.map(post => post.timestamp.toISOString().split('T')[0])));

      const topPosts = [];

      for (let i = 0; i < dates.length; i++) {
        const datePosts = posts.filter(post => post.timestamp.toISOString().split('T')[0] === dates[i]);
        if (datePosts.length > 0) {
          topPosts.push(datePosts[0]);
        }
      }

      return res.status(200).json(topPosts);

    } catch (error) {
      console.log("Database read failed:", error);
      return res.status(500).json({ error: 'Database read failed.' });
    }
  } else {
    return res.status(405).json({ error: 'Invalid request method. Only GET requests are allowed.' });
  }
}
