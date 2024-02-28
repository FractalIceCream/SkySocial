import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import AuthService from "../utils/auth";

import TripInfoModal from "./TripInfoModal";

import { QUERY_ME } from "../utils/queries";

import { CREATE_TRIP, REMOVE_TRIP } from "../utils/mutation";
import SignUpForm from "./Navbar/SignUpForm";
import { useTheme } from "../utils/ThemeContext";

// create button to close input box to add trip
// add css to input form

const Wishlist = ({ authUser, wishlist }) => {

  const [showInputBox, setShowInputBox] = useState(false);
  const [inputState, setInputState] = useState("");
  const [themeState] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const [createTrip, { error, data }] = useMutation(CREATE_TRIP, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const [removeTrip, { err, Data }] = useMutation(REMOVE_TRIP, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const [tripModal, setTripModal] = useState({});

  const wishlistStyles = {
    background: themeState.darkTheme ? 'linear-gradient(172deg, rgba(13,107,204,1) 17%, rgba(137,186,241,1) 63%, rgba(186,206,235,1) 79%, rgba(218,224,241,1) 89%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)',
		color: themeState.darkTheme ? 'white' : 'white',
		// Add other styles as needed
  }
  const innerWishlistStyles = {
    background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(183,226,255,1) 17%, rgba(235,240,249,1) 75%, rgba(218,224,241,1) 100%)' : 'linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)',
    
    color: themeState.darkTheme ? '#333' : '#333',

  }
  const buttonStyles = {
    background: themeState.darkTheme ? `linear-gradient(313deg, rgba(13,107,204,1) 17%, rgba(218,224,241,1) 99%)` : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
    color: themeState.darkTheme ? 'white' : 'white',
  }



  const handleInputChange = (event) => {
    const city = event.target.value;
    setInputState(city);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const authUser = AuthService.getProfile();
      if (!authUser) {
        console.error("User not authenticated");
      } else {
        const { data } = await createTrip({
          variables: { name: inputState },
        });

        setInputState("");
        setShowInputBox(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTrip = async (tripId) => {
    try {
      const { data } = await removeTrip({
        variables: { tripId },
      });
    } catch (error) {
      console.error("Error removing trip", error);
    }
  };

  const handleClose = () => {
    setShowInputBox(false);
  };
  const handleTripModal = (tripinfo) => {
    setTripModal(tripinfo);
    setIsOpen(!isOpen);

  }

  return (
    <div className="flex flex-grow h-wishlist-height mt-4 w-wishlist-width flex-wrap items-center justify-center rounded-custom " style={wishlistStyles}>
      <div className="text-2xl ">
        <h2>Wishlist</h2>
      </div>

      <div className="mt-2 border border border-black flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom p-4 shadow-inner-strong" style={innerWishlistStyles} >
        {wishlist &&
          wishlist.map((tripinfo) => (
            <div key={tripinfo._id}>
              {/* need help styling this to the correct position */}
              <div className="border border-black flex justify-evenly mt-4 w-32 h-auto items-center rounded-custom" style={buttonStyles}>
                <div className="flex justify-center items-start w-auto h-auto" >
                  <button
                    onClick={() => authUser ? handleRemoveTrip(tripinfo._id) : null}
                    className="text-md text-center"
                  >
                    x
                  </button>
                </div>
                <div className="flex text-center"  >
                    <button
                    key={tripinfo._id}
                    onClick={() => authUser ? handleTripModal(tripinfo) : null}
                    className=" h-auto w-auto justify-start items-center flex text-center  rounded-custom "
                    >
                    <p className="font-semibold">
                      {tripinfo.name}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {isOpen && (
          <div>
            <TripInfoModal tripId={tripModal._id} tripInfo={tripModal} name={tripModal.name} onHide={() => setIsOpen(false)} />
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-evenly">
        <div className="flex items-center justify-evenly">
          <button
            className="ml-5 h-20 w-auto text-2xl "
            onClick={() => authUser ? setShowInputBox(true) : null}
          >
            Add Trip
          </button>

          {showInputBox && (
            <div className="absolute inset-0 w-full flex items-center justify-center">
              <div className="relative bg-gray text-center border rounded-full border-black shadow-custom max-w-md w-full">
                <h2 className="text-2xl text-center text-white font-semibold mb-4">
                  Add a city to your wishlist!
                </h2>

                <div className="mb-4">
                  <input
                    onChange={handleInputChange}
                    placeholder="City Name"
                    type="text"
                    className="mt-1 bg-white text-black text-center h-12 rounded-custom border w-72"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleFormSubmit}
                    className="bg-green-200 text-black border border-black rounded-custom px-4 py-2 mr-2"
                  >
                    Submit
                  </button>

                  <button
                    className=" text-white px-4 py-2 rounded-md"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
