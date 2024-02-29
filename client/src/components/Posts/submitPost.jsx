import { CREATE_POST } from "../../utils/mutation";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AuthService from "../../utils/auth";

import { QUERY_POST, QUERY_ME } from "../../utils/queries";

import { useTheme } from "../../utils/ThemeContext";

const SubmitPosts = () => {
  const [postValue, setPostValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [createPost, { error }] = useMutation(CREATE_POST, {
    refetchQueries:
      window.location.pathname === "/me" ? [QUERY_ME] : [QUERY_POST],
    // [
    //   QUERY_POST, 'posts',
    //   QUERY_ME, 'me',
    // ]
  });

  // const [createPost, { error }] = useMutation
  // (CREATE_POST, {
  //   update(cache, { data:{createPost}}){
  //     const {posts} = cache.readQuery({query: QUERY_POST});
  //     cache.writeQuery({
  //       query: QUERY_POST,
  //       data: {posts: posts.concat([createPost])}
  //     })
  //   },
  // });

  // const {loading} = useQuery(QUERY_ME);
  const handleInputChange = (event) => {
    const postText = event.target.value;
    setPostValue(postText);
  };

  const handleImageChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
  };

  // useEffect(() => {
  //   console.log("Updated Image URL:", imageURL);
  // }, [imageUrl]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const authUser = AuthService.getProfile();
      if (!authUser) {
        console.error("User not authenticated");
        return;
      }
      setImageUrl(imageUrl);
      const { data } = await createPost({
        variables: {
          postText: postValue,
          postAuthor: authUser.name,
          imageUrl,
        },
      });

      // console.log("server response:", data);

      setPostValue("");
      setImageUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const [themeState] = useTheme();

  const submitPostStyles = {
    background: themeState.darkTheme
      ? "linear-gradient(172deg, rgba(13,107,204,1) 17%, rgba(137,186,241,1) 63%, rgba(186,206,235,1) 79%, rgba(218,224,241,1) 89%)"
      : "linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)",
    color: themeState.darkTheme ? "white" : "white",
  };

  const innerSubmitStyles = {
    background: themeState.darkTheme
      ? "linear-gradient(180deg, rgba(183,226,255,1) 17%, rgba(235,240,249,1) 75%, rgba(218,224,241,1) 100%)"
      : "linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)",

    color: themeState.darkTheme ? "#333" : "#333",
  };
  const buttonStyles = {
    background: themeState.darkTheme
      ? ` linear-gradient(180deg, rgba(172,195,255,1) 0%, rgba(193,210,255,1) 62%, rgba(255,255,255,1) 92%, rgba(255,255,255,1) 100%, rgba(0,5,255,1) 100%)`
      : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
    color: themeState.darkTheme ? "#333" : "white",
  };

  return (
    <div
      className="flex-shrink h-submitPost w-submitPost mt-5 border border-black font-custom  box-border flex flex-wrap items-center justify-center flex-col rounded-custom "
      style={submitPostStyles}
    >
      <input
        value={postValue}
        onChange={handleInputChange}
        className=" border border-black text-2xl shadow-inner-strongest text-center w-inputSubmitPost h-inputSubmitPost rounded-custom"
        style={innerSubmitStyles}
        placeholder="Share your thoughts..."
      />
      <div className="bg-black w-2/3 mt-3 h-line"></div>
      <div className=" flex-shrink w-inputSubmitPost h-12 mt-4  flex flex-wrap justify-evenly items-center text-white">
        <div className=" flex justify-around w-5/12">
          <input
            type="url"
            value={imageUrl}
            onChange={handleImageChange}
            placeholder="Image URL"
            className="text-center rounded-custom w-32"
            style={innerSubmitStyles}
          />
          <i className="fa-solid fa-image fa-2x mr-2"></i>
        </div>

        <div className="flex w-5/12 justify-end">
          <button
            onClick={handleFormSubmit}
            className="w-32 text-lg border border-black rounded-custom "
            style={buttonStyles}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPosts;
