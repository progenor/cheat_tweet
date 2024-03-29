import { useRecoilState } from "recoil";
import { modalState, postIDState } from "../../atom/modalAtom";
import Moment from "react-moment";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";

import { useRouter } from "next/router";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIDState);
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const sendPost = async () => {
    if (loading) return;
    else setLoading(true);

    await addDoc(collection(db, "posts", postId, "comments"), {
      name: session?.user?.name,
      username: session?.user?.username,
      userImg: session?.user?.image,
      text: input,
      timestamp: serverTimestamp(),
      uID: session?.user?.uid,
    });

    setInput("");
    setLoading(false);
    setOpen(false);
    setPostId(postId);
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] border-gray-200 translate-x-[-50%] bg-white border-2 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b-[3px]">
              <GrFormClose
                onClick={() => setOpen(false)}
                className="m-2 rounded-full cursor-pointer itmes-center h-7 w-7 hover:bg-gray-200"
              />
            </div>
            <div className="flex flex-col p-2">
              <div className="relative flex items-center gap-1">
                <span className="w-0.5 h-full z-[-1] absolute left-6 top-11 bg-gray-300"></span>
                <img
                  src={post?.data()?.userImg}
                  alt="user profile pic"
                  className="h-12 mr-1 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex cursor-pointer">
                    <h3 className="mr-3 font-bold hover:underline">
                      {post?.data()?.name}
                    </h3>
                    <h2 className="mr-2">@{post?.data()?.username}</h2>
                    <h2 className="hidden md:inline">
                      <Moment fromNow>
                        {post?.data()?.timestamp?.toDate()}
                      </Moment>
                    </h2>
                  </div>
                  <p className="text-gray-500">{post?.data()?.text}</p>
                </div>
              </div>

              <div className="flex p-3 space-x-3 border-b border-gray-200">
                <img
                  src={String(session?.user?.image || logo)}
                  alt="profile picture"
                  className="w-[55px] h-[55px] rounded-full cursor-pointer hover:brightness-95"
                />
                <div className="flex flex-col w-full">
                  <div>
                    <textarea
                      rows={3}
                      placeholder={`Reply to @${post?.data()?.username}`}
                      className="w-full text-lg placeholder-gray-700 border-none focus:ring-0 tracking-wide min-h-[50px] text-gray-800"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between border-t-[3px] pt-3 items-center">
                    {!loading && (
                      <>
                        <div className="flex gap-2">
                          <div>
                            <BsFillEmojiSunglassesFill className="p-1 text-red-500 cursor-pointer w-7 h-7 hover:text-red-700 hover:bg-red-100 rounded-3xl" />
                          </div>
                        </div>
                        <button
                          className="p-2 px-4 bg-red-500 rounded-3xl hover:brightness-95 disabled:opacity-50"
                          disabled={!input.trim()}
                          onClick={() => sendPost()}
                        >
                          Reply
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
