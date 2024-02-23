import Navbar from "../components/./Navbar/Navbar";
import Footer from "../components/Footer";
import PostContainer from "../components/Posts/PostContainer";
// import Following from "../components/Following";
import Actions from "../components/Actions"
import Wishlist from "../components/Wishlist";

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const { name: nameParam } = useParams();

  const { loading, data } = useQuery(nameParam ? QUERY_SINGLE_PROFILE : QUERY_ME, {
    variables: { name: nameParam }
  });

  const profile  = data?.me || data?.profile || {};

  if (Auth.loggedIn() && Auth.getProfile().data.name === nameParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!profile?.name) {
    return (
      <h1> Must be logged in to access profile </h1>
    );
  }

  return (
    <div>
    <Navbar />
    <PostContainer />
    <Wishlist 
      wishlist = {profile.wishlist}
    />
    <Actions />
    <Footer />



    </div>

  )




}

export default Profile;