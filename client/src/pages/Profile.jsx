import Navbar from "../components/./Navbar/Navbar";
import Footer from "../components/Footer";
import PostContainer from "../components/Posts/PostContainer";
// import Following from "../components/Following";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"
import Auth from "../utils/auth";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";
import Wishlist from '../components/Wishlist';
import Itinerary from '../components/Itinerary';


const Profile = () => {
  const {profileId} = useParams();

  // const { loading, data } = useQuery(
  //   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
  //   {
  //     variables: { profileId: profileId }
  //   }
  // );

  const { loading, data } = useQuery(QUERY_ME);
  const profile = data?.me || {}; 
  console.log(profile.wishlist)
  // const profile = data?.me || data?.profile || {};
  const wishlist = profile?.wishlist;
  // console.log(profile);

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be loggen in to see your profile page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      {/* this is a test */}
      <Navbar />
      <div className="w-full overflow-y-auto flex items-center shadow-custom bg-gray-dark h-postContainer rounded-custom">
      <div className="flex flex-col">
        <Itinerary profile={profile}/>
        <Wishlist profile={profile}/>
        </div>
      
      <PostContainer profile={profile}/>
      {/* <h2 className="card-header">
        {profile ? `${profile.name}` : 'No name retrieved'}
        {profileId ? `${profile.name}'s` : 'No name retrieved'} 
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

  )




}

export default Profile;