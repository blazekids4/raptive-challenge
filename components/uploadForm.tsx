// UploadForm.tsx

import React, { useState, useEffect } from "react";
// ... other imports ...
import TopPosts from "./TopPosts";
import LowViewPrivatePosts from "./LowViewPrivatePosts";
import HighScoreDailyPosts from "./HighScoreDailyPosts";
// ... more imports as needed ...

const UploadForm: React.FC = () => {
  // ...existing code...

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // ...existing logic...
  }, [posts]);

  return (
    <>
      <ToastContainer />
      <Card className="mx-3 sm:p-3 overflow-auto">
        <div className="flex flex-col min-h-screen py-2 sm:ml-4">
          {/* Display loading state */}
          {isUploading ? <p className="text-rap4">Uploading...</p> : null}

          {/* ...existing code... */}

          <TabGroup index={tabIndex} onIndexChange={setTabIndex}>
            <TabList className="mt-8">
              <Tab>Top Posts</Tab>
              <Tab>Low View Private Posts</Tab>
              <Tab>Highest Scoring Daily Posts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TopPosts posts={topPosts} />
              </TabPanel>
              <TabPanel>
                <LowViewPrivatePosts posts={lowViewPrivatePosts} />
              </TabPanel>
              <TabPanel>
                <HighScoreDailyPosts posts={highScoreDailyPosts} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Card>
    </>
  );
};

export default UploadForm;
