import Post from "./Post";
import SubmitPosts from "./submitPost";
//Add Map For Map.Posts
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME } from "../../utils/queries";

import {useQuery} from '@apollo/client';

const PostContainer = ({userPosts}) => {

	// const { loading, data } = useQuery(
  //   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
  //   {
  //     variables: { profileId: profileId }
  //   }
  // );
	
	const { loading, error, data } = useQuery(
		QUERY_POST);

	const posts = userPosts || data?.posts;
	// AuthService.loggedIn() ?
	return  (
		<>
		<div
			className="w-postContainer overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom"
			style={{
				overflow: "auto",
				scrollbarWidth: "thin",
				scrollbarColor: "transparent transparent",
				msOverflowStyle: "none",
			}}
		>
			<SubmitPosts />
			<div className="overflow-y-auto mt-5 align-center">
				<Post posts={posts}/>
			</div>
		</div>
		</>	
	) 
	// : (	<div></div>	);
};

export default PostContainer;
