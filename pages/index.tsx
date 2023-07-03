import { Inter } from "next/font/google";
import AllPosts from "../components/AllPosts";
import TopPosts from "../components/TopPosts";
import LowViewPrivate from "../components/LowViewPrivatePosts";
import HighScoreDailyPosts from "../components/HighScoreDailyPosts";
import UploadForm from "../components/csvUpload";

import {
  Card,
  Flex,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Card className="mx-3 sm:p-3 overflow-auto">
        <div className="flex flex-col items-left   m-4 py-2">
          <br />
          <h1 className="text-4xl  text-rap4">Hello Raptive</h1>
        </div>

        <Card className="m-4 items-left">
          <TabGroup>
            <TabList className="mt-8 text-rap4 font-semibold">
              <Tab className="mx-3 ">All Posts</Tab>
              <Tab className="mx-3">Top Posts</Tab>
              <Tab className="mx-3">High Score</Tab>
              <Tab className="mx-3">Low View</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="flex flex-col items-start m-4 py-2">
                  <Flex>
                    <AllPosts posts={[]} />
                  </Flex>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-start m-4 py-2">
                  <Flex>
                    <TopPosts posts={[]} />
                  </Flex>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-start m-4 py-2">
                  <HighScoreDailyPosts />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col items-start m-4 py-2">
                  <Flex>
                    <LowViewPrivate posts={[]} />
                  </Flex>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </Card>
    </>
  );
}
