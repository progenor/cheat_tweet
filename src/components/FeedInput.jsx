/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import logo from "@/assets/images/cheat_tweet_logo.png";

import { AiOutlineFileImage } from "react-icons/ai";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const FeedInput = () => {
  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;
    else setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user?.uid,
      name: session?.user?.name,
      username: session?.user?.username,
      text: input,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const fileRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(fileRef, selectedFile, "data_url").then(async () => {
        const getFileURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: getFileURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
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
            {selectedFile && (
              <div className="relative">
                <IoCloseCircleOutline
                  onClick={() => setSelectedFile(null)}
                  className="absolute text-red-500 rounded-full cursor-pointer h-7 w-7 top-3 left-3 hover:text-black hover:bg-white"
                />
                <img
                  src={selectedFile}
                  alt="selected file"
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex justify-between border-t-[3px] pt-3 items-center">
              {!loading && (
                <>
                  <div className="flex gap-2">
                    <div>
                      <BsFillEmojiSunglassesFill className="p-1 text-red-500 cursor-pointer w-7 h-7 hover:text-red-700 hover:bg-red-100 rounded-3xl" />
                    </div>
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <AiOutlineFileImage className="p-1 text-red-500 cursor-pointer w-7 h-7 hover:text-red-700 hover:bg-red-100 rounded-3xl" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImage}
                      />
                    </div>
                  </div>
                  <button
                    className="p-2 px-4 bg-red-500 rounded-3xl hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                    onClick={() => sendPost()}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedInput;
