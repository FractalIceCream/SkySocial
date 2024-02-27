import Post from "./Post";
import SubmitPost from "./submitPost";
//Add Map For Map.Posts
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME } from "../../utils/queries";
import { useTheme } from "../../utils/ThemeContext";
import { useQuery } from '@apollo/client';

const PostContainer = ({ userPosts }) => {

	// const { loading, data } = useQuery(
	//   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
	//   {
	//     variables: { profileId: profileId }
	//   }
	// );

	const [themeState] = useTheme();

	const postContainerStyles = {
		background: themeState.darkTheme ? '#333' : '#fff',
		color: themeState.darkTheme ? '#fff' : '#333',
		// Add other styles as needed
	};

	const { loading, error, data } = useQuery(
		QUERY_POST);

	const posts = userPosts || data?.posts || [];
	// AuthService.loggedIn() ?
	// console.log(posts);
	return (
			<div
				className="w-postContainer overflow-y-auto flex flex-col items-center h-postContainer rounded-custom"
				style={{
					overflow: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "transparent transparent",
					msOverflowStyle: "none",
					postContainerStyles,
					background: 'inherit'
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
