import { BsBookmarksFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

const Post = ({ post }) => {
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
            <h2 className="hidden md:inline">timestamp</h2>
          </div>
          <BsThreeDots className="mr-2 text-2xl cursor-pointer" />
        </div>
        <p className="mb-2">{post.data().text}</p>
        <img src={post.data().image} alt="post image" />

        {/* buttons */}
        <div className="flex justify-between px-4 my-5">
          <AiOutlineComment className="mr-2 text-2xl cursor-pointer" />
          <AiOutlineHeart className="mr-2 text-2xl cursor-pointer" />
          <BsBookmarksFill className="mr-2 text-2xl cursor-pointer" />
          <BsTrash className="mr-2 text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Post;
