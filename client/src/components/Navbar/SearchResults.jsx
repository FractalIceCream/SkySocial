import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => (
        <SearchResult key={id} data={result} />
      ))}
    </div>
  );
};

export default SearchResultsList;