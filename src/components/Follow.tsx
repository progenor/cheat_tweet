type FollowProps = {
  name: string;
  userName: string;
  userImage: string;
  followLink: string;
};

const Follow = (props: FollowProps) => {
  return (
    <div className="flex items-center justify-between px-3 py-3 transition-all duration-150 ease-in-out hover:bg-gray-400">
      <div className="flex gap-4">
        <img
          src={props.userImage}
          alt="user profile pic"
          className=" w-[55px] h-[60px] rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold ">{props.name}</h1>
          <h2 className="">@{props.userName}</h2>
        </div>
      </div>
      <button className="px-4 py-2 bg-red-500 rounded-full">Follow</button>
      {/* TODO: add follow link */}
    </div>
  );
};

export default Follow;
