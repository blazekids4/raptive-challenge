import React, { useEffect, useState, useCallback } from "react";
import { Post } from "@prisma/client";
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

interface PostTableProps {
  posts: Post[];
}

const PostTable: React.FC<PostTableProps> = () => {
  const [posts, setPosts] = useState([]);

  const fetchDataFromDb = async () => {
    try {
      // Fetch data from the /api/posts endpoint
      const response = await fetch("/api/uploads/getPosts"); // replace with your correct endpoint
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Update the posts state with the data from the DB
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

  useEffect(() => {
    // Fetch the posts when the component mounts
    fetch("/api/uploads/getPosts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []); // The empty array makes this run only on mount

  return (
    <div>
      <Card>
        <Flex className="flex-col sm:flex-row">
          <Table className="mt-5 text-left divide-y divide-gray-200 w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-sm">
                  Title
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Privacy
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </TableHeaderCell>
                <TableHeaderCell className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comments
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
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap max-w-sm">
                      <Text className="text-sm text-rap5">{post.title}</Text>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.privacy}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.likes}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.views}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-rap5 whitespace-nowrap">
                      {post.comments}
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

export default PostTable;
