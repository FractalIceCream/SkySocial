import { CREATE_COMMENT } from "../../utils/mutation";
import { REMOVE_POST } from "../../utils/mutation";
import React, { useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME, QUERY_PROFILE_BY_NAME} from "../../utils/queries";



const Post = ({ posts }) => {
    // if (!posts.length) {
    //  return <h3>No Posts Yet!</h3>;
    // }
    const [profileId, setProfileId] = useState('');
    const [createComment, { error }] = useMutation(CREATE_COMMENT);
    const [removePost, { err }] = useMutation(REMOVE_POST, {
        refetchQueries:
            window.location.pathname === "/me" ? [QUERY_ME] : [QUERY_POST],
        //  [
        //  QUERY_POST,
        //  QUERY_ME,
        // ]
    });

    const [getUserByName, { loading, data }] = useLazyQuery(QUERY_PROFILE_BY_NAME, {
        variables: {
            name: Post.postAuthor
        }
    });

    const handleFetchedUser = async (author) => {
        try {
            const { data } = await getUserByName({
                variables: {
                    name: author,
                },
            });
            console.log(data);
            const profileId = data.profileByName._id;
            console.log(profileId)
            setProfileId(profileId);
            window.location.href = `/profiles/${profileId}`;
        } catch (err) {
            console.error(err);
        }
    };
	
    const authProfile = AuthService.getProfile();
    const loggedInProfile = authProfile ? authProfile.data.name : null;
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
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemovePost = async (postId) => {
        // console.log(postId)
        try {
            const { data } = await removePost({
                variables: { postId },
            });
        } catch (error) {
            console.error("Error removing post", error);
        }
    };

    // This component will need to be updated to include the submitted info
    return (
        <div>
            {posts &&
                posts
                    .slice()
                    .reverse()
                    .map((Post) => (
                        <div
                            key={Post._id}
                            className="w-submitPost flex-grow max-w-custom h-post mt-4  bg-gray rounded-custom text-white"
                        >
                            <div className="flex justify-between ">
                                <button onClick={() => handleFetchedUser(Post.postAuthor)} value={Post.postAuthor}>
                                    <h2 className="ml-7 mt-2">{Post.postAuthor}</h2>
                                </button>
                                <h2 className="mr-7 mt-2">{Post.createdAt}</h2>
                                {loggedInProfile === Post.postAuthor && (
                                    <button onClick={() => handleRemovePost(Post._id)}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                )}
                            </div>
                            <div className="border ml-2 h-12 w-1/3 flex justify-center items-center">
                                Badge goes here
                            </div>
                            <div className="h-48 mt-3 bg-gray ">
                                <div className=" flex justify-evenly flex-wrap  w h-3/4">
                                    <img
                                        className="max-w-full rounded-custom max-h-full h-auto"
                                        src={Post.imageUrl}
                                    ></img>
                                </div>
                                <div className=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
                                    <p>{Post.postText}</p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="h-line bg-white mt-4 w-submitComment  "></div>
                            </div>
                            <div className="h-10  max-w-custom flex justify-evenly">
                                <button className="ml-3">Like</button>
                                <button>View Comments</button>
                            </div>
                            <div className=" flex  max-w-custom justify-evenly">
                                <div className="flex w-20 justify-center  ml-3 rounded-full mb-3 hover:bg-transparent bg-green-400  items-center">
                                    <button
                                        onClick={handleFormSubmit}
                                        className="text-center text-black "
                                    >
                                        Comment
                                    </button>
                                </div>
                                <input
                                    value={comment}
                                    onChange={handleInputChange}
                                    className="h-8 flex justify-center text-center text-white bg-gray-light rounded-custom w-2/3 "
                                    placeholder="Comment here..."
                                ></input>
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default Post;
