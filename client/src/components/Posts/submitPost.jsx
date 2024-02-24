import { CREATE_POST } from "../../utils/mutation";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import AuthService from "../../utils/auth";
import { QUERY_POST } from "../../utils/queries";

const SubmitPosts = ({ posts }) => {
	const [postValue, setPostValue] = useState("");

	const [createPost, { error }] = useMutation(CREATE_POST, {
		refetchQueries: [QUERY_POST, "posts"],
	});

	const handleInputChange = (event) => {
		const postText = event.target.value;
		setPostValue(postText);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const authUser = AuthService.getProfile();
			if (!authUser) {
				console.error("User not authenticated");
				return;
			}

			const { data } = await createPost({
				variables: {
					postText: postValue,
					postAuthor: authUser.name, // Adjust based on your token payload
				},
			});

			setPostValue("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div class=" flex-shrink h-submitPost w-submitPost mt-5 font-custom  shadow-custom box-border flex flex-wrap items-center justify-center flex-col rounded-custom bg-gray">
			<input
				value={postValue}
				onChange={handleInputChange}
				class="font-extralight text-white text-2xl shadow-inner-strongest text-center w-inputSubmitPost h-inputSubmitPost  bg-gray-light rounded-custom"
				placeholder="Share your thoughts..."
			></input>
			<div class="bg-black w-2/3 mt-3 h-line"></div>
			<div class=" flex-shrink w-inputSubmitPost h-12 mt-4  flex flex-wrap justify-evenly items-center text-white">
				<div class=" flex justify-around w-5/12">
					<button class=" w-16 h-6 text-lg ">Photo</button>
				</div>
				<div class="flex w-5/12 justify-end">
					<button
						onClick={handleFormSubmit}
						class=" w-32 text-lg rounded-custom bg-button-dark hover:bg-slate-600"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default SubmitPosts;
