import { AiOutlineSearch } from "react-icons/ai";
import Follow from "./Follow";
import News from "./News";

const RightSidebar = () => {
  return (
    <div className="hidden lg:inline xl:w-[600px] ml-8">
      {/* Search bar */}
      <div className="w-[90%] xl:w[75%] sticky top-0 py-1.5 z-50 rounded-full">
        <div className="relative flex items-center p-3 bg-red-400 rounded-full">
          <AiOutlineSearch className="z-50 w-auto h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 bg-gray-100 border-gray-300 rounded-full focus:ring-black pl-11 focus:shadow-lg focus:bg-white"
          />
        </div>
      </div>

      {/* News */}
      <div className="py-4 mt-3 bg-gray-200 rounded-2xl">
        <h1 className="pl-3 text-xl font-bold">Trends for you</h1>
        <News category="Math" likes={20} name="Trigo" />
        <News category="Info" likes={10} name="Grafok" />
        <News category="Magyar" likes={300} name="Technology" />
      </div>
      {/* Who to follow */}
      <div className="py-4 mt-3 bg-gray-200 rounded-2xl">
        <h1 className="pl-3 text-xl font-bold">Who to follow?</h1>
        <Follow
          name="WhoWhat"
          userName="who"
          userImage="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          followLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <Follow
          name="Idk"
          userName="idk"
          userImage="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          followLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </div>
    </div>
  );
};

export default RightSidebar;
