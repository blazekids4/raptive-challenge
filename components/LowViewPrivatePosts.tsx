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

interface LowViewPrivateProps {
  posts: Post[];
}

const LowViewPrivate: React.FC<LowViewPrivateProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchDataFromDb = async () => {
    try {
      const response = await fetch("/api/uploads/getPosts");
      if (response.ok) {
        const data: Post[] = await response.json();
        const filteredPosts = data
          .filter((post) => post.privacy === "private")
          .sort((a, b) => a.views - b.views)
          .slice(0, 50);
        setPosts(filteredPosts);
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

export default LowViewPrivate;
