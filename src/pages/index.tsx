import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Sidebar from "@/components/Sidebar";

import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Cheat Tweet</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen mx-auto">
          <Sidebar />
          <Feed />
          <RightSidebar />
          <CommentModal />
        </main>
      </div>
    </>
  );
}
