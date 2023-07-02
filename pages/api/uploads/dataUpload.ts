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

        try {
          await prisma.post.create({
            data: processedItem,
          });
        } catch (error) {
          if (error.code === 'P2002' && error.meta?.target?.includes('id')) {
            console.log(`Post with ID ${processedItem.id} already exists. Skipping.`);
            continue;
          } else {
            throw error;
          }
        }
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
