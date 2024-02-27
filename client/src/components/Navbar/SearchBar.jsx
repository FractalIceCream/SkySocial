import { useState } from "react";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import { QUERY_PROFILE_BY_NAME } from "../../utils/queries"; 
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"; 
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [profileId, setProfileId] = useState("");
  const [profileName, setProfileName] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [getUserByName, { loading, data }] = useLazyQuery(
    QUERY_PROFILE_BY_NAME,
    {
      variables: {
        name: searchInput,
      },
    }
  );

  const onHide = () => {
      setModalOpen(false)
  }


  const handleInputChange = (event) => {
      const profile = event.target.value;
      setSearchInput(profile)
 
  };

  const handleFormSubmit = async ( event ) => {
    event.preventDefault();

    try {
      const { data } = await getUserByName({
        variables: {
          name: searchInput,
        },
      });
      const profileId = data.profileByName._id;
      const profileName = data.profileByName.name
      setProfileId(profileId);
      setProfileName(profileName)
    } catch (err) {
      console.error(err);
    }
  


    setModalOpen(true);
    

    console.log(data);
  };

  return (
    <>
    <form  className="flex flex-row">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" >
        Search
      </label>
      <div className="flex justify-center items-center">
        <input
          type="text"
          onChange={handleInputChange}
          id="default-search"
          className="w-full  text-md text-white border border-black rounded-custom px-4 py-1 bg-gray-light "
          placeholder="Search SkySocial"
          required
        />
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="text-white ml-3 h-7 border-black bg-gray-light rounded-custom w-32"
        >
          Search
        </button>
      </div>
    </form>




  {modalOpen && (
        <div className="absolute flex justify-between items-center w-52 mt-2 bg-gray-light rounded-custom border border-black ml-3 text-white">
          <Link className="ml-3" to={`/profiles/${profileId}`}>{profileName}</Link>
          <button className="text-md mr-2 w-4 " onClick={onHide}>
            x
          </button>
        </div>
      )}
  

  </>
  )}
export default SearchBar;
