import Post from "./Post";
import SubmitPost from "./submitPost";
import { QUERY_POST } from "../../utils/queries";
import { useTheme } from "../../utils/ThemeContext";
import { useQuery } from '@apollo/client';

const PostContainer = ({ userPosts }) => {
	const [themeState] = useTheme();

	const postContainerStyles = {
		background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(107,107,107,1) 63%, rgba(255,255,255,0) 100%))' : '#fff',
		color: themeState.darkTheme ? '#fff' : '#333',
	};

	const { loading, error, data } = useQuery(
		QUERY_POST);

	const posts = userPosts || data?.posts || [];

	return (
		<div
			className="w-postContainer overflow-y-auto flex flex-col bg-transparent items-center h-postContainer rounded-custom"
			style={{
				overflow: "auto",
				scrollbarWidth: "thin",
				scrollbarColor: "transparent transparent",
				msOverflowStyle: "none",
				...postContainerStyles,
			}}>
			<SubmitPost />
			{posts.slice().reverse().map(post => (
				<Post key={post._id} post={post} />))}
		</div>
	)
};

export default PostContainer;
