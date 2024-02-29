import { CREATE_POST } from "../../utils/mutation";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import AuthService from "../../utils/auth";

import { QUERY_POST, QUERY_ME } from "../../utils/queries";

import { useTheme } from "../../utils/ThemeContext";

const SubmitPosts = () => {
  const [postValue, setPostValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [createPost, { error }] = useMutation(CREATE_POST, {
    refetchQueries:
      window.location.pathname === "/me" ? [QUERY_ME] : [QUERY_POST],
  });

  const handleInputChange = (event) => {
    const postText = event.target.value;
    setPostValue(postText);
  };

  const handleImageChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
  };

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

    color: themeState.darkTheme ? "#333" : "white",
  };
  const buttonStyles = {
    background: themeState.darkTheme
      ? ` linear-gradient(180deg, rgba(172,195,255,1) 0%, rgba(193,210,255,1) 62%, rgba(255,255,255,1) 92%, rgba(255,255,255,1) 100%, rgba(0,5,255,1) 100%)`
      : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
    color: themeState.darkTheme ? "#333" : "white",
  };

  return (
    <div
      className="grow max-w-custom h-submitPost mt-5 border border-black   box-border    flex-col rounded-custom "
      style={submitPostStyles}
    >
      <input
        value={postValue}
        onChange={handleInputChange}
        className=" text-2xl shadow-inner-strongest text-center flex w-full h-inputSubmitPost rounded-custom"
        style={innerSubmitStyles}
        placeholder="Share your thoughts..."
      />
      
      <div className="   h-12 mt-4  flex  justify-evenly items-center text-white">
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
