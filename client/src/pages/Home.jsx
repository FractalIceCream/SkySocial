import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Itinerary from "../components/Itinerary";
import PostContainer from "../components/Posts/PostContainer";
import Friends from "../components/Friends";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"


const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Itinerary />
      <PostContainer />
      <Wishlist />
      <Friends />
      <Actions />
      <Footer />
    </div>
  );
};

export default Home;