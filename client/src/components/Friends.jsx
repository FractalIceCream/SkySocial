import React from 'react';
import { Link } from 'react-router-dom';

const FriendsList = ({ friends }) => {
  if (!friends.length) {
    return <h3>No Friendss Yet</h3>;
  }

  return (
    <div>
      <h3>Friends</h3>
      <div className= "">
      {friends &&
        friends.map((friends) => (
          <div key={friends._id} className="">
            <Link
              className=""
              to={`/profile/${friends._id}`}
            > {friends.username}
            </Link>
          </div>
        ))}</div>
    </div>
  );
};

export default FriendsList;
