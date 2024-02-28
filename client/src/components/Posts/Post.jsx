import { CREATE_COMMENT } from "../../utils/mutation";
import {
  REMOVE_POST,
  ADD_LIKE,
  REMOVE_LIKE,
  REMOVE_COMMENT,
} from "../../utils/mutation";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import AuthService from "../../utils/auth";
import {
  QUERY_POST,
  QUERY_ME,
  QUERY_PROFILE_BY_NAME,
  QUERY_ALL_PROFILES,
} from "../../utils/queries";
// badges are not updating on home page and when a new post is created
// need to style badges
const Post = ({ post }) => {
  // if (!posts.length) {
  //  return <h3>No Posts Yet!</h3>;
  // }
  const [profileId, setProfileId] = useState("");
  const [commentShow, setCommentShow] = useState(false);
  const [wishListItem, setWishListItem] = useState(null);
  const [createComment, { error }] = useMutation(CREATE_COMMENT);
  const [removePost, { err }] = useMutation(REMOVE_POST, {
    refetchQueries:
      window.location.pathname === "/me" ? [QUERY_ME] : [QUERY_POST],
    //  [
    //  QUERY_POST,
    //  QUERY_ME,
    // ]
  });

  const [removeComment, { removeCommentError }] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [QUERY_POST, "posts"],
    variables: { postId: post._id },
  });

  const [getUserByName, { loading, data }] = useLazyQuery(
    QUERY_PROFILE_BY_NAME,
    {
      variables: {
        name: Post.postAuthor,
      },
    }
  );

  const [getProfilesData, { loading: profilesLoading, data: profilesData }] =
    useLazyQuery(QUERY_ALL_PROFILES);
  const onPageLoad = async () => {
    getProfilesData();
  };
  useEffect(() => {
    onPageLoad();
  }, []);
  useEffect(() => {
    if (profilesData && post) {
      const profileData = profilesData.profiles.find(
        (profile) => profile.name === post.postAuthor
      );
      const wishlist = profileData?.wishlist;
      setWishListItem(wishlist);
    }
  }, [profilesLoading, profilesData]);
  // const profileForPostAuthor = profilesData.profiles.find(profile => profile.name === post.postAuthor);
  const handleFetchedUser = async (author) => {
    try {
      const { data } = await getUserByName({
        variables: {
          name: author,
        },
      });
      // console.log(data);
      const profileId = data.profileByName._id;
      // console.log(profileId)
      setProfileId(profileId);
      window.location.href = `/profiles/${profileId}`;
    } catch (err) {
      console.error(err);
    }
  };
  const showComments = () => {
    setCommentShow((prevCommentShow) => !prevCommentShow);
  };
  const authProfile = AuthService.getProfile();
  const loggedInProfile = authProfile ? authProfile.data.name : null;

  const isLoggedIn = AuthService.loggedIn();

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
          postId: post._id,
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
  const [isLiked, setIsLiked] = useState(false);
  const [addLike, { likeError }] = useMutation(ADD_LIKE, {
    refetchQueries: [QUERY_POST, "posts"],
  });
  const [removeLike, { removeLikeError }] = useMutation(REMOVE_LIKE, {
    refetchQueries: [QUERY_POST, "posts"],
  });
  const handleLike = async (postId) => {
    try {
      const { data } = await addLike({
        variables: { postId },
      });
    } catch (error) {
      console.error(error);
    }
    setIsLiked(true);
  };
  const handleRemoveLike = async (postId) => {
    try {
      const { data } = await removeLike({
        variables: { postId },
      });
    } catch (error) {
      console.error(error);
    }
    setIsLiked(false);
  };

  const handleRemoveComment = async (postId, commentId) => {
    try {
      await removeComment({
        variables: { postId, commentId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // {/* {posts && */}
  // 				{/* posts.slice().reverse().map((post) => ( */}
  // This component will need to be updated to include the submitted info
  return (
    // <div className='text-white h-12'> {userPost.postText} </div>
    // <div>

    <div
            key={post._id}
            className="w-submitPost shadow-custom border border-black overflow-y max-w-custom h-auto mt-4 bg-gray rounded-custom text-white"
        >
            <div className="flex justify-between">
                <div className="">
                {loggedInProfile === post.postAuthor && (
                    <button onClick={() => handleRemovePost(post._id)}><i className="fa-regular  px-5  fa-trash-can"></i></button>
                )}
                </div>
                <div className="flex">
                <button onClick={() => handleFetchedUser(post.postAuthor)} value={post.postAuthor}>
                    <h2 className=" mt-2">{post.postAuthor}</h2>
                </button>
                <h2 className="ml-5 mr-2 mt-2">posted on {post.createdAt}</h2>
            </div>
           </div>
            <div className="overflow-auto-y flex-wrap ml-2 h-auto w-1/3 flex justify-evenly items-center">
                {!wishListItem ? (
                    <span>Loading...</span>
                ) : (
                    // Render wishlist names here
                    wishListItem.slice(0, 3).map((item) => (
                        <div key={item._id} className="flex">
                            <p className=" h-auto w-16 items-center text-center rounded-custom bg-green-200 font-semibold text-black">
                                {item.name}
                            </p>
                        </div>
                    ))
                )}
            </div>
      {post.imageUrl ? (
        <div className="h-48 mt-3 bg-gray ">
          <div className=" flex justify-evenly flex-wrap  w h-3/4">
            <img
              className="max-w-full rounded-custom max-h-full h-auto"
              src={post.imageUrl}
            ></img>
          </div>
          <div className=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
            <p>{post.postText}</p>
          </div>
        </div>
      ) : (
        <div className="h-auto mt-3 bg-gray ">
          <div className=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
            <p>{post.postText}</p>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="h-line bg-black  mt-4 w-submitComment  "></div>
      </div>
      <div className="h-10  max-w-custom flex justify-evenly items-center">
        <div>{post.likesCount}
        {isLiked && isLoggedIn ? (
          <button className="ml-3" onClick={() => handleRemoveLike(post._id)}>
            Unlike
          </button>
        ) : (
          <button className="ml-3" onClick={() => handleLike(post._id)}>
            Like
          </button>
        )}
        </div>
        <button onClick={showComments}>View Comments</button>
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
          className="h-8 flex justify-center border border-black text-center text-white bg-gray-light rounded-custom w-2/3 "
          placeholder="Comment here..."
        ></input>
      </div>

      {commentShow &&
        post.comments &&
        post.comments.map((commentOfPost) => (
          <div key={commentOfPost._id} className="max-h-12 mt-4 overflow-y">
            <div className="flex flex-col h-auto">
              <div className="bg-gray-light flex justify-center items-center flex-wrap rounded-custom">
                <p className="p-2 m-1"> {commentOfPost.commentText} </p>
              </div>
              <div className="flex justify-around items-center mt-1">
                <div className= "ml-4">
                  {loggedInProfile === commentOfPost.commentAuthor && (
                    <button
                      onClick={() =>
                        handleRemoveComment(post._id, commentOfPost._id)
                      }
                     className="ml-4"
                      
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
                <div
                  className="flex-grow text-end mr-2"
                  
                >
                  {" "}
                  {/* Set max-width for the commented by section */}
                    <p className= "mr-3"> 
                    Commented by {commentOfPost.commentAuthor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
    // </div>
  );
};

export default Post;
