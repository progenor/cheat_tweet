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
import { modalState, postIDState } from "atom/modalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const Comment = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likeComment = async () => {
    if (session) {
      if (hasLikes) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          ),
          {
            username: session.user.username,
          }
        );
      }
    } else {
      signIn();
    }
  };

  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      // delete post from firestore
      await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  };

  return (
    <div className="flex pt-2 pl-20 border border-gray-200">
      <img
        src={comment?.userImg}
        className="h-[70px] rounded-full cursor-pointer"
        alt="user profile picture"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer">
            <h3 className="mr-3 font-bold hover:underline">{comment?.name}</h3>
            <h2 className="mr-2">@{comment?.username}</h2>
            <h2 className="hidden md:inline">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </h2>
          </div>
          <BsThreeDots className="mr-2 text-2xl cursor-pointer" />
        </div>
        <p className="pl-2 mb-2">{comment?.text}</p>
        {comment?.image && <img src={comment?.image} alt="post image" />}
        {/* buttons */}
        <div className="flex justify-between px-4 my-5">
          <div className="flex items-center">
            {!hasLikes ? (
              <AiOutlineHeart
                onClick={() => likeComment()}
                className="mr-2 text-2xl cursor-pointer"
              />
            ) : (
              <AiFillHeart
                onClick={() => likeComment()}
                className="mr-2 text-2xl text-red-500 cursor-pointer"
              />
            )}
            {likes.length > 0 && (
              <span className="text-sm">{likes.length}</span>
            )}
          </div>

          <BsBookmarksFill className="mr-2 text-2xl cursor-pointer" />
          {session?.user.uid === comment?.uID && (
            <BsTrash
              onClick={() => deleteComment()}
              className="mr-2 text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
