import React from 'react';
import { useQuery } from '@apollo/client';


const SearchResultsList = ({ onHide }) => {






  // <"flex flex-col rounded-custom border border-black bg-gray text-4xl text-white shadow-inner-strong">
  return (
    // <div className="static w-96">
    // <div className="static w-96">
      <div className="static px-12 w-48 bg-gray text-white" > 
      
        <div className="flex justify-around">
          <h1 className="ml-16 text-2xl">Users</h1>
          <button className="text-lg m" onClick={onHide}>x</button>
        </div>
        <div className="border mb-2 ml-12 w-32"></div>
        <div className="flex flex-col items-center overflow-y-auto">
          <div className="flex rounded-custom flex-col w-52 h-52 bg-gray-light overflow-y-auto text-black justify-center items-center">

            {/* users go here*/}

          </div>
        </div>
      </div>
      //</div></div>
  );
};

export default SearchResultsList;