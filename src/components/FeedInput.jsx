/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import logo from "@/assets/images/cheat_tweet_logo.png";

import { AiOutlineFileImage } from "react-icons/ai";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const FeedInput = () => {
  const { data: session } = useSession();

  const [input, setInput] = useState("");

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user?.uid,
      name: session?.user?.name,
      username: session?.user?.username,
      text: input,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <>
      {session && (
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
                placeholder="What's happening?"
                className="w-full text-lg placeholder-gray-700 border-none focus:ring-0 tracking-wide min-h-[50px] text-gray-800"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="flex justify-between border-t-[3px] pt-3 items-center">
              <div className="flex gap-2">
                <BsFillEmojiSunglassesFill className="p-1 text-red-500 cursor-pointer w-7 h-7 hover:text-red-700 hover:bg-red-100 rounded-3xl" />
                <AiOutlineFileImage className="p-1 text-red-500 cursor-pointer w-7 h-7 hover:text-red-700 hover:bg-red-100 rounded-3xl" />
              </div>
              <button
                className="p-2 px-4 bg-red-500 rounded-3xl hover:brightness-95 disabled:opacity-50"
                disabled={!input.trim()}
                onClick={() => sendPost()}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedInput;
