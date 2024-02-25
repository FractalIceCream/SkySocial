import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
// import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Following from "../components/Following";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Itinerary from "../components/Itinerary";

const Home = () => {
  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <div className="flex ">
        <div className="flex flex-col">
          <Itinerary />
          <Wishlist />
        </div>
        <div></div>

        <div className="overflow-y-auto  flex flex-col items-center shadow-custom bg-gray-dark  rounded-custom">
          <PostContainer />
        </div>
        <div className="flex flex-col">
          <Following />
          <Actions />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
