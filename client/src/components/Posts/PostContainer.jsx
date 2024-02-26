import Post from "./Post";
import SubmitPosts from "./submitPost";
//Add Map For Map.Posts
import AuthService from "../../utils/auth";
import { QUERY_POST, QUERY_ME } from "../../utils/queries";

import { useQuery } from "@apollo/client";

const PostContainer = ({ userPosts, allPosts }) => {
  // const { loading, data } = useQuery(
  //   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
  //   {
  //     variables: { profileId: profileId }
  //   }
  // );

  const { loading, error, data } = useQuery(QUERY_POST);

  const posts = userPosts || data?.posts;
  // AuthService.loggedIn() ?
  return (
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
          <Post posts={posts} />
        </div>
        {allPosts &&
          allPosts.map((post) => (
            <div
              key={Post._id}
              className="w-submitPost flex-grow max-w-custom h-post mt-4  bg-gray rounded-custom text-white"
            >
              <div className="flex justify-between ">
                <button
                  onClick={() => handleFetchedUser(Post.postAuthor)}
                  value={Post.postAuthor}
                >
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
              <div>
                <h1>Hello</h1>
              </div>
              {Post.comments && (
                <div className="comments-section">
                  <h3>Comments:</h3>
                  {Post.comments.map((comment) => (
                    <div key={comment._id}>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
  // : (	<div></div>	);
};

export default PostContainer;
