import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UNFOLLOW_PROFILE } from "../utils/mutation";
import { QUERY_FOLLOWING } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useTheme } from "../utils/ThemeContext";



const Following = ({ following }) => {

  const [themeState] = useTheme();

  const { loading, error, data } = useQuery(QUERY_FOLLOWING);

  const followingStyles = {
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)',
		color: themeState.darkTheme ? '#fff' : 'white',
  };
  const innerFollowingStyles = {
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)' : 'linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)',
    
    color: themeState.darkTheme ? '#fff' : 'white',

  }

  // display loading state
  if (loading) return <p>Loading...</p>;

  // display error message
  if (error) return <p>Error: {error.message}</p>;

  // Check if the user is not following anyone
  if (!data.following || data.following.length === 0) {
    return (
      <div className="box-border flex h-wishlist-height w-wishlist-width items-center justify-center rounded-custom bg-gray shadow-2xl" style={followingStyles}>
        <p className="text-xl font-semibold text-white">You are not following anyone yet.</p>
      </div>
    );
  }

  // const following = data.following;

  return (
    <div className="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom bg-gray shadow-2xl" style={followingStyles}>
      <div className="text-2xl font-semibold" style={{textDecoration: 'none', color:'inherit'}}>
        <h2>Following</h2>
      </div>

      <div className="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom p-4 shadow-inner-strong" style={innerFollowingStyles}>
        {following &&
          following.map((user) => (
            <div key={user._id} className="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
              <Link to={`/profiles/${user._id}`} className="text-decoration-none font-semibold text-black">
                <p className="font-semibold text-black">{user.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Following;

