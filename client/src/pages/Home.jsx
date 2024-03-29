import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import PostContainer from "../components/Posts/PostContainer";
import TripContainer from "../components/Trips/TripContainer";
import { useTheme } from "../utils/ThemeContext";

const Home = () => {

  const [themeState] = useTheme();

  const homeStyles = {
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(6,179,250,1) 13%, rgba(6,179,250,1) 13%, rgba(6,179,250,1) 18%, rgba(123,217,255,1) 51%, rgba(161,228,255,1) 65%, rgba(182,234,255,1) 73%, rgba(214,243,255,1) 85%, rgba(255,255,255,1) 100%)' : 'linear-gradient(335deg, rgba(78,95,236,1) 5%, rgba(102,117,238,1) 10%, rgba(133,145,241,1) 14%, rgba(157,166,244,1) 18%, rgba(194,199,248,1) 21%, rgba(255,255,255,1) 26%, rgba(0,0,0,1) 31%, rgba(68,61,47,1) 88%, rgba(255,252,18,1) 100%)',
		color: themeState.darkTheme ? '#fff' : '#fff',
	}
  return (
    <div className="h-10" style={{
					overflow: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "transparent transparent",
					msOverflowStyle: "none",
					...homeStyles,
				}} id="home">
      <Navbar />
      <div className="w-full overflow-y-auto flex justify-center items-start rounded-custom min-h-full">
    
        <PostContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
