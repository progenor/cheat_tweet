type NewsProps = {
  category: string;
  name: string;
  likes: number;
};

const News = (props: NewsProps) => {
  return (
    <div className="py-2 pl-3 transition-all duration-150 ease-in-out hover:bg-gray-400">
      <h3 className="text-white-500 ">{props.category}</h3>
      <h2 className="font-semibold ">{props.name}</h2>
      <h3 className="text-white-500">{props.likes} Likes</h3>
    </div>
  );
};

export default News;
