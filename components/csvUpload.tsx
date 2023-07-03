import Papa from "papaparse"; //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
import { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadForm() {
  const [parsedData, setParsedData] = useState([]);
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);
  const [posts, setPosts] = useState([]);
  const notifySuccess = () => toast.success("Data uploaded successfully!");
  const notifyFailure = () => toast.error("Error occurred during data upload");
  const [isUploading, setIsUploading] = useState(false);

  const fetchDataFromDb = async () => {
    try {
      // Fetch data from the /api/posts endpoint
      const response = await fetch("/api/uploads/getPosts"); // replace with your correct endpoint
      if (response.ok) {
        const data = await response.json();
        setParsedData(data); // Update the local state with the data from the DB
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

  const saveDataToDb = async (data) => {
    setIsUploading(true); // Start the upload
    // Check if data is valid before attempting to save
    if (data && data.length) {
      try {
        // Post the data to the /api/dataUpload endpoint
        const response = await fetch("/api/uploads/dataUpload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        // Check if the request was successful
        if (response.ok) {
          notifySuccess();
          setIsUploading(false); // End the upload
          await fetchDataFromDb();
        } else {
          setIsUploading(false); // End the upload
          notifyFailure();
        }
      } catch (error) {
        console.error("Network error:", error);
        setIsUploading(false); // End the upload
      }
    }
  };

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        // Parsed Data Response in array format
        setParsedData(results.data);
        saveDataToDb(results.data); // Save data to DB after parsing
        // Filtered Column Names
        setTableRows(rowsArray[0]);
        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <>
      <ToastContainer />
      <Card className="mx-3 sm:p-3 overflow-auto">
        <div className="flex flex-col min-h-screen py-2 sm:ml-4">
          {/* Display loading state */}
          {isUploading ? <p className="text-rap4">Uploading...</p> : null}
          <input
            type="file"
            id="file"
            name="file"
            onChange={changeHandler}
            accept=".csv"
            className="hidden"
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-rap1 hover:bg-rap4 hover:text-rap1 text-rap4 font-bold py-2 px-4 rounded"
          >
            1. Upload CSV File
          </label>
          <br />
          <br />
          <Title className="text-rap4 font-bold py-2 px-4 rounded bg-rap1">
            2. Enjoy Post Data
          </Title>
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
                        {post.timestamp}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Flex>
        </div>
      </Card>
    </>
  );
}
