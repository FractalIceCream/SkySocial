import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Itinerary from "../components/Itinerary";
import Post from "../components/Posts.jsx/Post";
import Friends from "../components/Friends";
import Wishlist from "../components/Wishlist";
import Actions from "../components/Actions"

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Itinerary />
      <Post />
      <Wishlist />
      <Friends />
      <Actions />
      <Footer />
    </div>
  );
};

export default Home;
