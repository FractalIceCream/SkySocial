import React from 'react';
import { useQuery } from '@apollo/client';


const SearchResultsList = ({ onHide }) => {







  return (
   <div class="absolute w-32 flex flex-col  rounded-custom border border-black bg-gray text-4xl text-white shadow-inner-strong">
    <div class="flex justify-around">
      <button class="text-lg m" onClick={onHide}>x</button>
    </div>

    <div class="flex flex-col items-center overflow-y-auto">
    <div class="flex rounded-custom flex-col w-52 h-52 bg-gray-light overflow-y-auto text-black justify-center items-center">

    {/* users go here*/}

    </div>
    </div>
  </div>
  );
};

export default SearchResultsList;