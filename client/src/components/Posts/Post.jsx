import { CREATE_COMMENT } from "../../utils/mutation";
import { REMOVE_POST, ADD_LIKE, REMOVE_LIKE, REMOVE_COMMENT } from "../../utils/mutation";
import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME, QUERY_PROFILE_BY_NAME, QUERY_ALL_PROFILES } from "../../utils/queries";
import { useTheme } from "../../utils/ThemeContext";

const Post = ({ post }) => {
  const [profileId, setProfileId] = useState("");
  const [commentShow, setCommentShow] = useState(false);
  const [wishListItem, setWishListItem] = useState(null);
  const [createComment, { error }] = useMutation(CREATE_COMMENT);
  const [removePost, { err }] = useMutation(REMOVE_POST, {
    refetchQueries:
      window.location.pathname === "/me" ? [QUERY_ME] : [QUERY_POST],
  });

  const [removeComment, { removeCommentError }] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [QUERY_POST, 'posts'],
    variables: { postId: post._id }
  })

  const [getUserByName, { loading, data }] = useLazyQuery(
    QUERY_PROFILE_BY_NAME,
    {
      variables: {
        name: Post.postAuthor,
      },
    }
  );
  const [getAllPosts] = useLazyQuery(QUERY_POST);
  const [getProfilesData, { loading: profilesLoading, data: profilesData }] =
    useLazyQuery(QUERY_ALL_PROFILES);
  const onPageLoad = async () => {
    getAllPosts();
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

  const handleFetchedUser = async (author) => {
    try {
      const { data } = await getUserByName({
        variables: {
          name: author,
        },
      });

      const profileId = data.profileByName._id;
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
          commentAuthorId: authUser.userId,
        },
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemovePost = async (postId) => {
    try {
      const { data } = await removePost({
        variables: { postId },
      });
    } catch (error) {
      console.error("Error removing post", error);
    }
  };
  const [isLiked, setIsLiked] = useState(post.likes.map(user => user._id).includes(AuthService.getProfile()?.data._id));
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
        variables: { postId, commentId }
      })
    } catch (error) {
      console.error(error)
    }
  }
  const [themeState, themeDispatch] = useTheme();
  const postStyles = {
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(183,226,255,1) 17%, rgba(235,240,249,1) 75%, rgba(218,224,241,1) 100%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 42%, rgba(40,39,39,1) 75%, rgba(79,78,78,0.8855917366946778) 100%)',
    color: themeState.darkTheme ? 'black' : 'white',
  };
  const innerPostStyles = {
    background: themeState.darkTheme ? 'white' : 'gray',

    color: themeState.darkTheme ? '#333' : 'white',
  }
  const buttonStyles = {
    background: themeState.darkTheme ? `linear-gradient(180deg, rgba(23,203,255,1) 21%, rgba(218,224,241,1) 100%)` : `radial-gradient(circle, rgba(13,13,13,1) 21%, rgba(39,39,40,1) 48%, rgba(89,91,97,1) 77%, rgba(170,175,188,1) 92%, rgba(0,0,0,1) 97%)`,
    color: themeState.darkTheme ? 'white' : 'white',
  }
  const innerInputStyles = {
    background: themeState.darkTheme ? 'white' : 'gray',

    color: themeState.darkTheme ? '#333' : 'white',
  }

  const commentButton = {
    background: themeState.darkTheme ? 'white' : 'gray',

    color: themeState.darkTheme ? '#333' : 'white',
  }

  return (
    <div
      key={post._id}
      className="max-w-custom shadow-custom border border-black overflow-y max-w-custom h-auto mt-4  rounded-custom" style={postStyles}
    >
      <div className="flex justify-between">
        <div className="">
          {loggedInProfile === post.postAuthor && (
            <button onClick={() => handleRemovePost(post._id)}><i className="fa-regular  px-5  fa-trash-can"></i></button>
          )}
        </div>
        <div className="flex">
          <button onClick={() => handleFetchedUser(post.postAuthor)} value={post.postAuthor}>
            <h1 className="mt-2">{post.postAuthor}</h1>
          </button>
          <h2 className="ml-5 mr-2 mt-2">posted on {post.createdAt}</h2>
        </div>
      </div>
      <div className="overflow-auto-y flex-wrap ml-2 h-auto w-1/3 flex justify-evenly items-center">
        {!wishListItem ? (
          <span>Loading...</span>
        ) : (
          wishListItem.slice(0, 3).map((item) => (
            <div key={item._id} className="flex">
              <p className=" h-auto w-auto items-center text-center text-sm p-1 rounded-custom font-semibold" style={buttonStyles}>
                {item.name}
              </p>
            </div>
          ))
        )}
      </div>
      {post.imageUrl ? (
        <div className="h-48 mt-3 ">
          <div className=" flex justify-evenly flex-wrap  w-full h-3/4">
            <img
              className="w-96 rounded-custom max-h-full h-auto"
              src={post.imageUrl}
            ></img>
          </div>
          <div className=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
            <p>{post.postText}</p>
          </div>
        </div>
      ) : (
        <div className="h-auto mt-3 ">
          <div className=" flex  max-w-custom overflow-auto   h-12 justify-center items-center text-center mt-2 ">
            <p>{post.postText}</p>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="h-line bg-black  mt-4 w-submitComment  "></div>
      </div>
      <div className="h-10  max-w-custom flex justify-evenly items-center" >
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
        <button onClick={showComments}>View Comments ({post.comments.length})</button>
      </div>
      <div className=" flex  max-w-custom justify-evenly">
        <div className="flex w-20 justify-center  ml-3 rounded-full mb-3 hover:bg-transparent items-center" style={commentButton}>
          <button
            onClick={handleFormSubmit}
            className="text-center rounded-full" 
          >
            <p className="rounded-full" style={innerInputStyles}>
              Comment
              </p>
          </button>
        </div>
        <input
          value={comment}
          onChange={handleInputChange}
          className="h-8 flex justify-center border border-black text-center bg-gray-light rounded-custom w-2/3 "
          placeholder="Comment here..."
          style={innerInputStyles}
        ></input>
      </div>
      {commentShow &&
        post.comments &&
        post.comments.map((commentOfPost) => (
          <div key={commentOfPost._id} className="max-h-12  mt-4 overflow-y">
            <div className="flex flex-col h-auto">
              <div className=" w-2/3 flex justify-center items-center flex-wrap rounded-custom" style={innerInputStyles}>
                <p className="p-2 m-1"> {commentOfPost.commentText} </p>
              </div>
              <div className="flex justify-around items-center mt-1">
                <div className="ml-4">
                  {loggedInProfile === commentOfPost.commentAuthor && (
                    <button
                      onClick={() =>
                        handleRemoveComment(post._id, commentOfPost._id)
                      }
                      className="ml-4 text-sm"
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
                <div
                  className="flex-grow text-end mr-2"
                >
                  {" "}
                  <p className="mr-3">
                    commented by {commentOfPost.commentAuthor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Post;
