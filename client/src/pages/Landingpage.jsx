import Navbar from "../components/./Navbar/Navbar";
import Footer from "../components/Footer";

import PostContainer from "../components/Posts/PostContainer";



const LandingPage = () => {
  return (
    <div className="container">
      <Navbar />
      <PostContainer />
      <Actions />
      <Footer />
    </div>
  );
};

export default LandingPage;
