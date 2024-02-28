import { CREATE_POST } from "../../utils/mutation";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AuthService from "../../utils/auth";

import { QUERY_POST, QUERY_ME } from "../../utils/queries";



const SubmitPosts = () => {
  const [postValue, setPostValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [createPost, { error }] = useMutation(CREATE_POST, {
    refetchQueries: window.location.pathname === '/me' ? [QUERY_ME] : [QUERY_POST]
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
  }

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
        }
      });

      // console.log("server response:", data);
  
      setPostValue("");
      setImageUrl('');
  
    } catch (err) {
      console.error(err);
    }
  };

	return (
   
		<div className="flex-shrink h-submitPost w-submitPost mt-5 border border-black font-custom  box-border flex flex-wrap items-center justify-center flex-col rounded-custom bg-gray">
		<input
  value={postValue}
  onChange={handleInputChange}
  className="font-extralight text-white border border-black text-2xl shadow-inner-strongest text-center w-inputSubmitPost h-inputSubmitPost  bg-gray-light rounded-custom"
  placeholder="Share your thoughts..."
/>
			<div className="bg-black w-2/3 mt-3 h-line"></div>
			<div className=" flex-shrink w-inputSubmitPost h-12 mt-4  flex flex-wrap justify-evenly items-center text-white">
				<div className=" flex justify-around w-5/12">
					<input type="url" value={imageUrl} onChange={handleImageChange} placeholder="Image URL" className="text-center rounded-custom w-32" style={{ color: 'black' }}/>
          <i className="fa-solid fa-image fa-2x" style={{ lineHeight: '1' }}></i>
					<h2></h2>
				</div>
    
				<div className="flex w-5/12 justify-end">
					<button onClick={handleFormSubmit}	className= "w-32 text-lg rounded-custom bg-button-dark hover:bg-slate-600">
						Send
					</button>
				</div>
			</div>
		</div>
    

	);
};

export default SubmitPosts;
