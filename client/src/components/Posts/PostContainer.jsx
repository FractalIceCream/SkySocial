import Post from "./Post";
import SubmitPosts from "./submitPost";
//Add Map For Map.Posts
import AuthService from "../../utils/auth";
import { QUERY_POST } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const PostContainer = () => {

  const { loading, error, data } = useQuery(QUERY_POST);

  const posts = data?.posts || [];

  



	return AuthService.loggedIn() ? (
		<div
			class="w-postContainer overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom"
			style={{
				overflow: "auto",
				scrollbarWidth: "thin",
				scrollbarColor: "transparent transparent",
				msOverflowStyle: "none",
			}}
		>
			<SubmitPosts />
			<div class="overflow-y-auto mt-5">
				<Post posts={posts} />
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default PostContainer;
