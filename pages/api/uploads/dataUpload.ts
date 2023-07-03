import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../lib/prisma";

export default async function dataUpload(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;  // Parse the data from the request body

    // If data is not provided or it's not an array, return an error
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format. Data must be an array.' });
    }

    try {
      // Loop over the data and create a post for each
      for (let item of data) {
        // Ensure data types match schema before sending to Prisma
        const processedItem = {
          id: parseInt(item.id),
          title: item.title,
          privacy: item.privacy,
          likes: parseInt(item.likes),
          views: parseInt(item.views),
          comments: parseInt(item.comments),
          timestamp: new Date(item.timestamp),
        };

        await prisma.post.upsert({
          where: { id: processedItem.id }, // Specify the post to update
          update: processedItem, // If the post exists, update it
          create: processedItem, // If the post doesn't exist, create it
        });
      }

      // If successful, return a 200 status with a success message
      return res.status(200).json({ message: 'Data successfully saved to database' });

    } catch (error) {
      console.log("Database write failed:", error);

      // If database write fails, return a 500 status with an error message
      return res.status(500).json({ error: 'Database write failed.' });
    }
  } else {
    // If the request method is not a POST, return an error
    return res.status(405).json({ error: 'Invalid request method. Only POST requests are allowed.' });
  }
}
