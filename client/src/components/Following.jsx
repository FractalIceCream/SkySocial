import React from "react";
import { Link, Navigate } from "react-router-dom";

// import { QUERY_FOLLOWING } from "../utils/queries"






const Following = ({ following }) => {

  // console.log(following);

  // const handleProfileClick = (event) => {
  //   event.preventDefault();
  //   // console.log(`/profiles/${event.target.id}`)
  //   return <Navigate to={`/profiles/${event.target.id}`} />
  // };

  return (
    //   <div className="w-followers h-followers flex flex-col items-center justify-center rounded-custom bg-gray font-custom shadow-custom">
    //   <div className="text-center text-2xl text-white">Following</div>
    //   <div className="w-innerFollowers h-innerFollowers mt-2 overflow-y-auto rounded-custom bg-gray-light shadow-inner-strongest">
    //     <ul className="flex flex-col text-center text-white">
    //       {following &&
    //         following.map((user) => (
    //           <div key={user._id} className="">
    //              <li key={user._id}>
    //           <Link to={`/profile/${following.profileId}`}>
    //             {following.profile.name}
    //           </Link>
    //           </li>
    //           </div>
    //         ))}
    //     </ul>
    //   </div>
    // </div>

    <div className="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom bg-gray shadow-2xl">
      <div className="text-2xl font-semibold text-white">
        <h2>Following</h2>
      </div>

      <div className="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom bg-gray-dark p-4 shadow-inner-strong">
        {following &&
          following.map((user) => (
            <Link to={`/profiles/${user._id}`} key={user._id} className="text-decoration-none font-semibold text-black">
            <button key={user._id} className="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
              <p className="font-semibold text-black">{user.name}</p>
            </button></Link>
          ))
        }
        {/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}
      </div>

    </div>

  );
};

export default Following;

