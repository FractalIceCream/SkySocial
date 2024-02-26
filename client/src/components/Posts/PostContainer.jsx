import Post from "./Post";
import SubmitPost from "./submitPost";
//Add Map For Map.Posts
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME } from "../../utils/queries";

import { useQuery } from '@apollo/client';

const PostContainer = ({ userPosts }) => {

	// const { loading, data } = useQuery(
	//   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
	//   {
	//     variables: { profileId: profileId }
	//   }
	// );

	const { loading, error, data } = useQuery(
		QUERY_POST);

	const posts = userPosts || data?.posts || [];
	// AuthService.loggedIn() ?
	// console.log(posts);
	return (
			<div
				className="w-postContainer overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom"
				style={{
					overflow: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "transparent transparent",
					msOverflowStyle: "none",
				}}
			>
				<SubmitPost />
				{posts.slice().reverse().map(post => (
					// <div key={post._id} className="overflow-y-auto mt-5 align-center">
						<Post key={post._id} post={post} />
					// </div>
				))}
			</div>
	)
	// : (	<div></div>	);
};

export default PostContainer;
