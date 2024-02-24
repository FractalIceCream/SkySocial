import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
// import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Following from "../components/Following";
// import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"


const Home = () => {
  return (
    <div className="w-full">
      <Navbar />
      {/* <Itinerary /> */}
      <PostContainer />
      {/* <Wishlist /> */}
      {/* <Friends /> */}
      {/* <Actions /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
