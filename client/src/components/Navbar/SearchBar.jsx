import { useState } from "react";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import SearchResults from "./SearchResults";

const SearchBar = ({  }) => {
  const [searchInput, setSearchInput] = useState('')
  const [modalOpen, setModalOpen] = useState(false)


  const onHide = () => {
      setModalOpen(false)
  }


  const handleInputChange = (event) => {
    try {
      const profile = event.target.value;
      setSearchInput(profile)
    } catch (error) {
    console.log(error)      
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setModalOpen(true);
    

    console.log(data);
  };

  return (
    <>
    <form
      className="flex flex-row "
      onSubmit={handleFormSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="flex justify-center items-center">
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
          type="text"
          onChange={handleInputChange}
          id="default-search"
          className="w-full  text-md text-white border border-gray-300 rounded-custom px-4 py-1 bg-gray-light "
          placeholder="Search SkySocial"
          required
        />
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="text-white ml-3 h-7 bg-gray-light rounded-custom w-32"
        >
          Search
        </button>
      </div>
    </form>




{modalOpen && (
  <div>
    <SearchResults modalOpen={modalOpen}  onHide = {onHide} />
  </div>
)



}
        







</>
  );
};

export default SearchBar;
