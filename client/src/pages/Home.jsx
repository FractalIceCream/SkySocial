import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
// import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Following from "../components/Following";
// import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"
import Wishlist from "../components/Wishlist";


const Home = () => {
  return (
    <div className="w-full">
      <Navbar />
      
      <div className="w-full overflow-y-auto flex flex-col items-center shadow-custom bg-gray-dark h-postContainer rounded-custom">
      <PostContainer />
      {/* <Itinerary /> */}
      {/* <Wishlist /> */}
      </div>
      {/* <Following /> */}
      {/* <Actions /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
