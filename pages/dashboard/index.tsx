import { Inter } from "next/font/google";
import TopPosts from "../../components/TopPosts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center m-4 py-2">
        <br />
        <h1 className="text-4xl text-rap4">Hello Raptive</h1>
        <p className="text-xl text-rap4">Let&apos;s Party</p>
      </div>
      <div className="flex flex-col items-center m-4 py-2">
        <TopPosts />
      </div>
    </>
  );
}
