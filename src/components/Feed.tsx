import FeedInput from "./FeedInput";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      userImg:
        "https://www.shutterstock.com/image-vector/abbreviation-idk-i-dont-know-260nw-1171333828.jpg",
      img: "https://live.staticflickr.com/7043/6904397957_aa41456455_z.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      timestamp: "1 hour ago",
      category: "You",
    },
    {
      id: 2,
      name: "John Doe",
      username: "johndoe",
      userImg:
        "https://www.shutterstock.com/image-vector/abbreviation-idk-i-dont-know-260nw-1171333828.jpg",
      img: "http://www.quickmeme.com/img/4b/4bb2c6353e8745406789dc00c23a7c5693d0a057c76dddb60a0edf5477ead632.jpg",
      text: "Yes fuck you too",
      timestamp: "2 hour ago",
      category: "Technology",
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky top-0 z-50 px-3 py-2 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
      </div>
      <FeedInput />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
