import Post from "./Post";
import submitPost from "./submitPost";
//Add Map For Map.Posts

const PostContainer = () => {
  return (
    <div class="w-postContainer overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom">
        <submitPost />
      <div class="overflow-y-auto mt-5">
        <Post />
      </div>
    </div>
  );
};

export default PostContainer;
