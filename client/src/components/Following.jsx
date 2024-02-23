import React from "react";
import { Link } from "react-router-dom";

// import { QUERY_FOLLOWING } from "../utils/queries"







const Following = ({ following }) => {


  return (
    <div class="w-followers h-followers flex flex-col items-center justify-center rounded-custom bg-gray font-custom shadow-custom">
    <div class="text-center text-2xl text-white">Followings</div>
    <div class="w-innerFollowers h-innerFollowers mt-2 overflow-y-auto rounded-custom bg-gray-light shadow-inner-strongest">
      <ul class="flex flex-col text-center text-white">
        {following &&
          following.map((following) => (
            <div key={following._id} className="">
               <li key={following.profileId}>
            <Link to={`/profile/${following.profileId}`}>
              {following.profile.name}
            </Link>
            </li>
            </div>
          ))}
      </ul>
    </div>
  </div>
  
  );
};

export default Following;

