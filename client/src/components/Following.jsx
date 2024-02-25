import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UNFOLLOW_PROFILE } from "../utils/mutation";
import { QUERY_FOLLOWING } from "../utils/queries"




const Following = ({ following }) => {
  const { loading, error, data, refetch } = useQuery(QUERY_FOLLOWING);
  const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE, {
    onCompleted: () => {
      refetch();
    }
  });

  const handleUnfollow = async (profileId) => {
    try {
      await unfollowProfile({ variables: { profileId } });

      
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  // display loading state
  if (loading) return <p>Loading...</p>;

  // display error message
  if (error) return <p>Error: {error.message}</p>;

  // Check if the user is not following anyone
  if (!data.following || data.following.length === 0) {
    return (
      <div className="box-border flex h-wishlist-height w-wishlist-width items-center justify-center rounded-custom bg-gray shadow-2xl">
        <p className="text-xl font-semibold text-white">You are not following anyone yet.</p>
      </div>
    );
  }

  const following = data.following;

  return (
    <div className="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom bg-gray shadow-2xl">
      <div className="text-2xl font-semibold text-white">
        <h2>Following</h2>
      </div>

      <div className="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom bg-gray-dark p-4 shadow-inner-strong">
        {following &&
          following.map((user) => (
            <div key={user._id} className="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
              <Link to={`/profiles/${user._id}`} className="text-decoration-none font-semibold text-black">
                <p className="font-semibold text-black">{user.name}</p>
              </Link>
              <button onClick={() => handleUnfollow(user._id)} className="ml-3 px-2 py-1 bg-red-500 text-white rounded">
                Unfollow
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Following;

