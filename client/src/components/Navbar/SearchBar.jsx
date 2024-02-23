import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";

import SearchResults from "./SearchResults";

const SearchBar = ({ searchInput, setSearchInput, setSearchResults }) => {
  const [getSingleProfile, { loading, data }] = useLazyQuery(QUERY_SINGLE_PROFILE);

  const handleInputChange = (event) => {
    try {
      const { value } = event.target;

      setSearchInput(value);
    } catch (error) {
      setSearchInput("No User Found");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the GraphQL query when the form is submitted
    getSingleProfile({ variables: { name: searchInput } });

    console.log(data);
  };

  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={handleFormSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
         
            {/* <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            /> */}
          
        </div>
        <input
          type="search"
          onChange={handleInputChange}
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search SkySocial"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
