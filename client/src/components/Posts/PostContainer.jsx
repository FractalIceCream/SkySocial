import Post from "./Post";
import SubmitPosts from "./SubmitPost";
//Add Map For Map.Posts
import Auth from "../../utils/auth";

const PostContainer = () => {
 


  return (
    Auth.loggedIn() ? (

    <div class="w-postContainer overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom" style={{ overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent', msOverflowStyle: 'none' }}>
        <SubmitPosts />
      <div class="overflow-y-auto mt-5">
        <Post />
      </div>
    </div>

    ): 
    (<div></div>)


    )
    }

export default PostContainer;
