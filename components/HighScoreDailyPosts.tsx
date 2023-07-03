import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Flex,
} from "@tremor/react";

interface Post {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
}

const HighScoreDailyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [csvData, setCsvData] = useState([]);

  const fetchDataFromDb = async () => {
    try {
      const response = await fetch("/api/uploads/getGroupedPosts");
      if (response.ok) {
        const data: Post[] = await response.json();
        setPosts(data);
        // Transform posts data into CSV format
        const csvData = data.map((post) => ({
          Id: post.id,
          Title: post.title,
          Likes: post.likes,
          Created: new Date(post.timestamp).toLocaleDateString(),
        }));

        // Set the csvData state
        setCsvData(csvData);
      } else {
        console.error("Error fetching data:", await response.text());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDb();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <Title className="text-rap4 underline">High Score Daily Posts</Title>
        <CSVLink
          data={csvData}
          filename={"high-score-daily-posts.csv"}
          className="text-rap1 text-sm font-semibold bg-rap4 rounded p-2 hover:bg-rap1 hover:text-rap4"
        >
          Export to CSV
        </CSVLink>
      </div>

      <Card>
        <Flex className="flex-col sm:flex-row">
          <Table className="mt-5 text-left divide-y divide-gray-200 w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white divide-y divide-gray-200">
              {posts.map((post, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap max-w-sm">
                      <Text className="text-sm text-rap5">
                        {post.title.length > 50
                          ? post.title.substring(0, 50) + "..."
                          : post.title}
                      </Text>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.likes}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Flex>
      </Card>
    </div>
  );
};

export default HighScoreDailyPosts;
