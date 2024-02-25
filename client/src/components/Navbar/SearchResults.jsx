import React from 'react';
import { useQuery } from '@apollo/client';


const SearchResultsList = ({ onHide }) => {







  return (
   <div class="absolute flex flex-col  rounded-custom border border-black bg-gray text-4xl text-white shadow-inner-strong">
    <div class="flex justify-around">
      <h1 class="ml-16 text-2xl">Users</h1>
      <button class="text-lg m" onClick={onHide}>x</button>
    </div>
    <div class="border mb-2 ml-12 w-32"></div>
    <div class="flex flex-col items-center">
    <div class="flex rounded-custom flex-col w-52 h-52 bg-gray-light overflow-y-auto text-black justify-center items-center">

    {/* users go here*/}
    <h1> chad</h1>
    <h1> chad</h1>
    <h1> chad</h1>
    <h1> chad</h1>
    <h1> chad</h1>
    <h1> chad</h1>
    <h1> chad</h1>

    </div>
    </div>
  </div>
  );
};

export default SearchResultsList;