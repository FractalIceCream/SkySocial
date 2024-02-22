import React from 'react';
import { Link } from 'react-router-dom'; 
const SearchResult = ({ data }) => {
  return (
    <div className="search-result">
      <Link to={`/profile/${data.profileId}`}>
        {data.name}
      </Link>
    </div>
  );
};

export default SearchResult;