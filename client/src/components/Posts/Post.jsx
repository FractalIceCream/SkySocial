import { CREATE_COMMENT } from "../../utils/mutation";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import AuthService from "../../utils/auth";

const Post = ({ posts }) => {
	// if (!posts.length) {
	// 	return <h3>No Posts Yet!</h3>;
	// }

	const [createComment, { error }] = useMutation(CREATE_COMMENT);

	const [comment, setComment] = useState("");

	const handleInputChange = (event) => {
		const commentValue = event.target.value;
		setComment(commentValue);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const authUser = AuthService.getProfile();
			if (!authUser) {
				console.error("User not authenticated");
				return;
			}

			const { data } = await createComment({
				variables: {
					commentText: comment,
					commentAuthorId: authUser.userId, // Adjust based on your token payload
				},
			});

      setComment('');
      
		} catch (err) {
			console.error(err);
		}
	};

	// This component will need to be updated to include the submitted info
	return (
		<div>
			{posts &&
				posts.map((Post) => (
					<div
						key={posts._id}
						class="w-submitPost shadow-inner-strong flex-grow max-w-custom h-post  bg-gray rounded-custom text-white"
					>
						<div class="flex justify-between ">
							<h2 class="ml-7 mt-2">{Post.postAuthor}</h2>
							<h2 class="mr-7 mt-2">{Post.createdAt}</h2>
						</div>
						<div class="border ml-2 h-12 w-1/3 flex justify-center items-center">
							Badges Goes Here
						</div>
						<div class="h-48 mt-3 bg-gray ">
							<div class=" flex justify-evenly flex-wrap w h-3/4">
								<img
									class="max-w-full rounded-custom max-h-full h-auto"
									src={Post.imageUrl}
								></img>
							</div>
							<div class=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
								<p>{Post.postText}</p>
							</div>
						</div>
						<div class="flex justify-center">
							<div class="h-line bg-white mt-4 w-submitComment  "></div>
						</div>
						<div class="h-10  max-w-custom flex justify-evenly">
							<button class="ml-3">Like</button>
							<button>View Comments</button>
						</div>
						<div class=" flex  max-w-custom justify-between">
							<div class="flex w-12 justify-center ml-3 rounded-full mb-3 hover:bg-transparent bg-green-400  items-center">
								<button onClick={handleFormSubmit} class=" ">Comment</button>
							</div>
							<input
								value={comment} onChange={handleInputChange} class="h-submitComment flex justify-center text-center text-white bg-gray-light rounded-custom w-submitComment "
								placeholder="Comment here..."
							></input>
						</div>
					</div>
				))}
		</div>
	);
};

export default Post;
