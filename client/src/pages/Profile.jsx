import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import PostContainer from "../components/Posts/PostContainer";
// import Following from "../components/Following";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { QUERY_SINGLE_PROFILE, QUERY_ME, QUERY_FOLLOWING } from "../utils/queries";
import Itinerary from "../components/Itinerary";
import Following from "../components/Following";
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from "../utils/mutation";
import Post from "../components/Posts/Post";
import { useTheme } from "../utils/ThemeContext";


const FollowProfileButton = ({ profileId }) => {
  const [followProfile] = useMutation(FOLLOW_PROFILE, {
    onCompleted: () => {
      window.location.reload();
    },
  });
  const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const { data: followData } = useQuery(QUERY_FOLLOWING);
  const followingIds = followData?.following.map((user) => user._id) || [];
  const isFollowing = followingIds.includes(profileId);

  const handleFollow = async () => {
    try {
      await followProfile({ variables: { profileId } });
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowProfile({ variables: { profileId } });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <>
      {!Auth.loggedIn() ||
      Auth.getProfile().data._id === profileId ? null : isFollowing ? (
        <button
          onClick={handleUnfollow}
          className="ml-3 px-2 py-1 bg-red-500 text-white rounded"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="ml-3 px-2 py-1 bg-blue-500 text-white rounded"
        >
          Follow
        </button>
      )}
    </>
  );
};

const Profile = () => {
	const { profileId } = useParams();

	const [themeState, themeDispatch] = useTheme();

	const profileStyles = {
    background: themeState.darkTheme ? 'radial-gradient(circle, rgba(34,34,34,1) 43%, rgba(62,62,62,1) 83%, rgba(87,87,87,1) 100%)' : 'linear-gradient(335deg, rgba(78,95,236,1) 5%, rgba(102,117,238,1) 10%, rgba(133,145,241,1) 14%, rgba(157,166,244,1) 18%, rgba(194,199,248,1) 21%, rgba(255,255,255,1) 26%, rgba(0,0,0,1) 31%, rgba(68,61,47,1) 88%, rgba(255,252,18,1) 100%)',
		color: themeState.darkTheme ? '#fff' : '#fff',
		// Add other styles as needed
	}

	// const { loading, data } = useQuery(
	//   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
	//   {
	//     variables: { profileId: profileId }
	//   }
	// );
	// console.log(profileId);
	// const querySwap = (profileId) => {
	//   if (profileId) {
	//     return (QUERY_SINGLE_PROFILE, {
	//       variables: {_id: profileId}
	//     });
	//   }
	//   return QUERY_ME;
	// }
	// const [dataQuery, setProfile] = useState({});

	const { loading, error, data } = useQuery(
		profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
		{
			variables: { profileId },
			// onCompleted: setProfile});
		}
	);
	const profile = data?.profile || data?.me || {};
	// const profile = dataQuery?.me || dataQuery?.profile || {}
	// const profile = data?.me || data?.profile || {};
	// const wishlist = profile?.wishlist;
	// console.log(profile);
	// console.log(profile.posts);
	if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
		return <Navigate to="/me" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!profile?.name) {
		return (
			<h4>
				You need to be logged in to see your profile page. Use the navigation
				links above to sign up or log in!
			</h4>
		);
	}

	return (
		<div className="w-full " style={profileStyles}>
			{/* this is a test */}
			<Navbar />
			<div className="w-full items-center flex justify-evenly min-h-full flex-wrap">
				<div className="flex flex-col">
					{Auth.getProfile().data._id === profile._id && (
						<Itinerary
							itinerary={profile.wishlist.filter((trip) => trip.itinerary)}
						/>
					)}
					{Auth.getProfile().data._id === profile._id && (
						<Wishlist
							wishlist={profile.wishlist.filter((trip) => !trip.itinerary)}
						/>
					)}
				</div>
				<div className="flex justify-center">
					{/* <PostContainer profile={profile} /> */}
					<PostContainer userPosts={profile.posts} allPosts={Post} />
				</div>
				<div className="flex justify-center">
					{Auth.getProfile().data._id === profile._id && (
						<Following following={profile.following} />
					)}
				</div>
				<h2 className="card-header">
          {/* {profile ? `${profile.name}` : "No name retrieved"}
          {profileId ? `${profile.name}'s` : "No name retrieved"} */}
          <FollowProfileButton profileId={profile._id} />
		  
        </h2>
			</div>
			{/* profile?.wishlist?.itinerary */}

			{/* {profileId ? `${profile.name}'s` : 'No name retrieved'}  */}
			{/* </h2>
      <Wishlist 
        wishlist={profile.wishlist}
      /> */}
			{/* <PostContainer /> */}
			{/* <Actions /> */}
			<Footer />
		</div>
	);
};

export default Profile;