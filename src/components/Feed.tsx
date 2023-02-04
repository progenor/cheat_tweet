import FeedInput from "./FeedInput";

const Feed = () => {
  return (
    <div className="xl:ml-[370px] border-l border-r  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky top-0 z-50 px-3 py-2 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
      </div>
      <FeedInput />
    </div>
  );
};

export default Feed;
