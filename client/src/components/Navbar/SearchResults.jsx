import React from "react";
import { useQuery } from "@apollo/client";

const SearchResultsList = ({ onHide }) => {
  // <"flex flex-col rounded-custom border border-black bg-gray text-4xl text-white shadow-inner-strong">
  return (
    // <div className="static w-96">
    // <div className="static w-96">
    <div className="absolute flex justify-evenly items-center w-52 mt-2 bg-gray-light rounded-custom border border-black ml-3 text-white">
  
        <h1>Chad</h1>
        <button className="text-md w-4 " onClick={onHide}>
          x
        </button>
   
    </div>
    //</div></div>
  );
};

export default SearchResultsList;
