import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
// import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Following from "../components/Following";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"
import { useQuery } from "@apollo/client";
import { useState } from "react";
import TripContainer from "../components/Trips/TripContainer";

const Home = () => {
  return (
    <div className="w-full">
      <Navbar />
      {/* removed flex flex-col */}
      <div className="w-full overflow-y-auto flex justify-center items-center shadow-custom bg-gray-dark h-postContainer rounded-custom">
      <TripContainer />
      <PostContainer />
      {/* <Itinerary /> */}
      </div>
      {/* <Following /> */}
      <Actions />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
