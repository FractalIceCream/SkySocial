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
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(6,179,250,1) 13%, rgba(6,179,250,1) 13%, rgba(6,179,250,1) 18%, rgba(123,217,255,1) 51%, rgba(161,228,255,1) 65%, rgba(182,234,255,1) 73%, rgba(214,243,255,1) 85%, rgba(255,255,255,1) 100%)' : 'linear-gradient(335deg, rgba(78,95,236,1) 5%, rgba(102,117,238,1) 10%, rgba(133,145,241,1) 14%, rgba(157,166,244,1) 18%, rgba(194,199,248,1) 21%, rgba(255,255,255,1) 26%, rgba(0,0,0,1) 31%, rgba(68,61,47,1) 88%, rgba(255,252,18,1) 100%)',
		color: themeState.darkTheme ? '#fff' : '#fff',
		// Add other styles as needed
	}

  return (
    <div className="w-full flex flex-col justify-between min-h-full" style={homeStyles} id="home">
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
