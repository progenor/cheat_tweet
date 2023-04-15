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

const Post = ({ id, post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIDState);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      router.push("/");
      // delete post from firestore
      await deleteDoc(doc(db, "posts", id));
      //delete post image from storage
      if (post.data()?.image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
    }
  };

  return (
    <div className="flex pt-2 border border-gray-200">
      <img
        src={post?.data()?.userImg}
        className="h-[70px] rounded-full cursor-pointer"
        alt="user profile picture"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer">
            <h3 className="mr-3 font-bold hover:underline">
              {post?.data()?.name}
            </h3>
            <h2 className="mr-2">@{post?.data()?.username}</h2>
            <h2 className="hidden md:inline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </h2>
          </div>
          <BsThreeDots className="mr-2 text-2xl cursor-pointer" />
        </div>
        <p className="pl-2 mb-2">{post?.data()?.text}</p>
        {post?.data()?.image && (
          <>
          <img src={post?.data()?.image} alt="CLCIK ME"/>
          <a target="_blank" href={post?.data()?.image} >
            OPEN IN NEW WINDOW
          </a>
          </>
        )}
        {/* buttons */}
        <div className="flex justify-between px-4 my-5">
          <div className="flex items-center">
            <AiOutlineComment
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="mr-2 text-2xl cursor-pointer"
            />
            {comments.length > 0 && (
              <span
                className="text-sm cursor-pointer"
                onClick={() => router.push(`/posts/${postId}`)}
              >
                {comments.length}
              </span>
            )}
          </div>
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
          {session?.user.uid === post?.data()?.id && (
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
