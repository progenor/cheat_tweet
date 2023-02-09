import { BsBookmarksFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { AiOutlineComment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

const Post = ({ post }) => {
  const { data: session } = useSession();

  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // delete post from firestore
      await deleteDoc(doc(db, "posts", post.id));
      //delete post image from storage
      if (post.data().image) {
        await deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  };

  return (
    <div className="flex border border-gray-200">
      <img
        src={post.data().userImg}
        className="h-[70px] rounded-full cursor-pointer"
        alt="user profile picture"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer">
            <h3 className="mr-3 font-bold hover:underline">
              {post.data().name}
            </h3>
            <h2 className="mr-2">@{post.data().username}</h2>
            <h2 className="hidden md:inline">
              <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
            </h2>
          </div>
          <BsThreeDots className="mr-2 text-2xl cursor-pointer" />
        </div>
        <p className="pl-2 mb-2">{post.data().text}</p>
        <img src={post.data().image} alt="post image" />

        {/* buttons */}
        <div className="flex justify-between px-4 my-5">
          <AiOutlineComment className="mr-2 text-2xl cursor-pointer" />
          <div className="flex items-center">
            {!hasLikes ? (
              <AiOutlineHeart
                onClick={() => likePost()}
                className="mr-2 text-2xl cursor-pointer"
              />
            ) : (
              <AiFillHeart
                onClick={() => likePost()}
                className="mr-2 text-2xl text-red-500 cursor-pointer"
              />
            )}
            {likes.length > 0 && (
              <span className="text-sm">{likes.length}</span>
            )}
          </div>

          <BsBookmarksFill className="mr-2 text-2xl cursor-pointer" />
          {session?.user.uid === post.data().id && (
            <BsTrash
              onClick={() => deletePost()}
              className="mr-2 text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
