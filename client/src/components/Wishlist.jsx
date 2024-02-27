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

const Wishlist = ({ wishlist }) => {
  // 	encountering error here
  //   if (!wishlist.length) {
  //     return <h3>No Wishlist Yet</h3>
  //   }

  const [showInputBox, setShowInputBox] = useState(false);
  const [inputState, setInputState] = useState("");
  const [themeState] = useTheme();
  // const [wishListItem, setWishListItem] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [createTrip, { error, data }] = useMutation(CREATE_TRIP, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const [removeTrip, { err, Data }] = useMutation(REMOVE_TRIP, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const [tripModal, setTripModal] = useState({});

  const wishlistStyles = {
    background: themeState.darkTheme ? '#333' : '#fff',
		color: themeState.darkTheme ? '#fff' : '#333',
		// Add other styles as needed
  }

  // const openModal = () => {
  //   setIsOpen(true);
  //   console.log(isOpen)
  // };
  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  const handleInputChange = (event) => {
    // console.log(event.target.value)
    const city = event.target.value;

    setInputState(city);
    // console.log(city)
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
    <div className="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom shadow-2xl" style={wishlistStyles}>
      <div className="text-2xl font-semibold">
        <h2>Wishlist</h2>
      </div>

      <div className="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom p-4 shadow-inner-strong">
        {wishlist &&
          wishlist.map((tripinfo) => (
            <div key={tripinfo._id}>
              {/* need help styling this to the correct position */}
              <div className="bg-green-200 flex justify-start mt-4 w-32 h-32 items-center rounded-custom">
                <div className="flex justify-center items-start w-12 h-12">
                  <button
                    onClick={() => handleRemoveTrip(tripinfo._id)}
                    className="text-md text-center text-black"
                  >
                    x
                  </button>
                </div>
                <div className="flex text-center">
                  <button
                    key={tripinfo._id}
                    onClick={() => handleTripModal(tripinfo)}
                    className=" h-32 w-12 justify-start items-center flex text-center  rounded-custom bg-green-200"
                  >
                    <p className="font-semibold pt-3 text-black">
                      {tripinfo.name}
                    </p>
                  </button>
                </div>
              </div>
              {/* {isOpen && (
                <div>
                  <TripInfoModal tripId={tripinfo._id} tripInfo={tripinfo} name={tripinfo.name} onHide={() => setIsOpen(false)} />
                  <button onClick={() => setIsOpen(false)}>Close Modal</button>
                </div>
              )} */}
            </div>
          ))}
        {isOpen && (
          <div>
            <TripInfoModal tripId={tripModal._id} tripInfo={tripModal} name={tripModal.name} onHide={() => setIsOpen(false)} />
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
          </div>
        )}
        {/* {wishlist &&
					wishlist.map((tripinfo) => (
						<button key={tripinfo._id} className="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
							<p className="font-semibold text-black">{tripinfo.name}</p>
						</button>
					))} */}
        {/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}
      </div>

      <div className="flex items-center justify-evenly">
        {/* <button className="h-4 w-4 rounded-full bg-black"></button>
        <button
          className="ml-5 h-20 w-20 text-xl font-semibold text-white"
          onClick={() => setShowInputBox(true)}
        ></button> */}

        <div className="flex items-center justify-evenly">
          {/* <button className="h-4 w-4 rounded-full bg-black"></button> */}
          <button
            className="ml-5 h-20 w-20 text-xl font-semibold"
            onClick={() => setShowInputBox(true)}
          >
            Add Trip
          </button>

          {showInputBox && (
            <div className="absolute top-0 right-0 w-full flex items-center justify-center">
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

            // <form >
            // 	<input
            // 		type="text"
            // 		placeholder="Enter wishlist destination"
            // 		value={inputState}
            // 		onChange={handleInputChange}
            // 	/>
            // 	<button onClick={handleFormSubmit}> Add Trip </button>
            // </form>
          )}

          {/* {isOpen && (
            <div>
              <TripInfoModal tripInfo={wishlist} onHide={() => setIsOpen(false)} />
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
