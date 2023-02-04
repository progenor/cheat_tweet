import { AiOutlineSearch } from "react-icons/ai";

const RightSidebar = () => {
  return (
    <div className="hidden lg:inline xl:w-[600px] ml-8">
      <div className="w-[90%] xl:w[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="relative flex items-center p-3 bg-red-400 rounded-full">
          <AiOutlineSearch className="z-50 w-auto h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 bg-gray-100 border-gray-300 rounded-full focus:ring-black pl-11 focus:shadow-lg focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
