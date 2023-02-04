import { BsBookmarksFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

type PostProps = {
  post: {
    id: number;
    name: string;
    username: string;
    userImg: string;
    img: string;
    text: string;
    timestamp: string;
    category: string;
  };
};

const Post = (props: PostProps) => {
  return (
    <div className="flex border border-gray-200">
      <img
        src={props.post.userImg}
        className="h-[70px] rounded-full cursor-pointer"
        alt="user profile picture"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer">
            <h3 className="mr-3 font-bold hover:underline">
              {props.post.name}
            </h3>
            <h2 className="mr-2">@{props.post.username}</h2>
            <h2 className="hidden md:inline">{props.post.timestamp}</h2>
          </div>
          <BsThreeDots className="mr-2 text-2xl cursor-pointer" />
        </div>
        <p className="mb-2">{props.post.text}</p>
        <img src={props.post.img} alt="post image" />

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
