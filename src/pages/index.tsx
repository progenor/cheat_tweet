import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Sidebar from "@/components/Sidebar";

import sty from "@/styles/Home.module.scss";
import Feed from "@/components/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Cheat Tweet</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={sty.main}>
          <Sidebar />
          <Feed />
        </main>
      </div>
    </>
  );
}
