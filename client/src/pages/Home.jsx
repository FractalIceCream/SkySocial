import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Following from "../components/Following";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import TripContainer from "../components/Trips/TripContainer";
import { useTheme } from "../utils/ThemeContext";

const Home = () => {

  const [themeState] = useTheme();

	const homeStyles = {
		background: themeState.darkTheme ? '#333' : '#fff',
		color: themeState.darkTheme ? '#fff' : '#333',
		// Add other styles as needed
	};

  return (
    <div className="w-full min-h-full" style={homeStyles} id="home">
      <Navbar />
      {/* removed flex flex-col */}
      <div className="w-full overflow-y-auto flex justify-center items-center rounded-custom min-h-full">
      <TripContainer />
      <PostContainer />
      {/* <Itinerary /> */}
      </div>
      {/* <Following /> */}
      {/* <Actions /> */}
      <Footer />
    </div>
  );
};

export default Home;
