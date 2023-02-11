import Head from "next/head";
import Sidebar from "@/components/Sidebar";

import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import Post from "@/components/Post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { db } from "../../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import CommentModal from "@/components/CommentModal";
import Comment from "@/components/Comment";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),

    [db, id]
  );

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <>
      <div>
        <Head>
          <title>Post</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen mx-auto">
          <Sidebar />

          {/* the post */}
          <div className="xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
            <div className="sticky top-0 z-50 flex items-center px-3 py-2 bg-white border-b border-gray-200">
              <div
                onClick={() => {
                  router.back();
                }}
              >
                <BsArrowLeft className="w-8 h-8 p-1 mr-2 transition-all ease-in-out rounded-full hover:bg-slate-300" />
              </div>
              <h2 className="text-lg font-bold cursor-pointer sm:text-xl">
                Post
              </h2>
            </div>
            <div className="">
              <Post id={id} post={post} />
            </div>

            {/* the comments on this post */}

            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
          </div>

          <RightSidebar />
          <CommentModal />
        </main>
      </div>
    </>
  );
}
