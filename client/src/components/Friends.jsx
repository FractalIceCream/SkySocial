import React from "react";
import { Link } from "react-router-dom";

import QUERY_FOLLOWERS from "../utils/queries"







const Followers = ({ followers }) => {


  return (
    <div class="w-followers h-followers flex flex-col items-center justify-center rounded-custom bg-gray font-custom shadow-custom">
    <div class="text-center text-2xl text-white">Followers</div>
    <div class="w-innerFollowers h-innerFollowers mt-2 overflow-y-auto rounded-custom bg-gray-light shadow-inner-strongest">
      <ul class="flex flex-col text-center text-white">
        {followers &&
          followers.map((followers) => (
            <div key={followers._id} className="">
               <li key={follower.profileId}>
            <Link to={`/profile/${follower.profileId}`}>
              {follower.profile.name}
            </Link>
            </li>
            </div>
          ))}
      </ul>
    </div>
  </div>
  
  );
};

export default Followers;

