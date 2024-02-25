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

const Profile = () => {
	const { profileId } = useParams();

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
				You need to be loggen in to see your profile page. Use the navigation
				links above to sign up or log in!
			</h4>
		);
	}

	return (
		<div>
			{/* this is a test */}
			<Navbar />
			<div className="w-full overflow-y-auto flex items-center shadow-custom bg-gray-dark h-postContainer rounded-custom">
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
				<div>
					{/* <PostContainer profile={profile} /> */}
					<PostContainer userPosts={profile.posts} />
				</div>
				<div>
					{Auth.getProfile().data._id === profile._id && (
						<Following following={profile.following} />
					)}
				</div>
				{/* <h2 className="card-header">
					{profile ? `${profile.name}` : "No name retrieved"}
					{profileId ? `${profile.name}'s` : "No name retrieved"}
				</h2> */}
			</div>
			{/* profile?.wishlist?.itinerary */}

			{/* {profileId ? `${profile.name}'s` : 'No name retrieved'}  */}
			{/* </h2>
      <Wishlist 
        wishlist={profile.wishlist}
      /> */}
			{/* <PostContainer /> */}
			{/* <Actions /> */}
			{/* <Footer /> */}
		</div>
	);
};

export default Profile;
