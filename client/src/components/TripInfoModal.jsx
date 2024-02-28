import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITINERARY, UPDATE_TRIP } from "../utils/mutation";
import { useTheme } from "../utils/ThemeContext";
const TripInfoModal = ({ tripId, tripinfo, name, onHide }) => {

  // const [profileFormData, setProfileFormData] = useState({
  //   originLocationCode: "",
  //   destinationLocationCode: "",
  //   departureDate: "",
  //   returnDate: "",
  //   adults: "",
  // });
  // console.log(tripId);
  const [tripFormData, setTripFormData] = useState(tripinfo || {});
  const [updateTrip, { error }] = useMutation(UPDATE_TRIP)
  const [addItinerary, { error : itineraryError }] = useMutation(ADD_ITINERARY);
  // console.log(tripFormData);
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(`${id} : ${value}`);
    // if (id === 'adults') {
    //   const numAdults = parseInt(value);
    //   console.log(numAdults);
    //   setTripFormData({...tripFormData, adults: numAdults});
    //   console.log(tripFormData.adults);
    // }
    event.target.value = value;
    setTripFormData({ ...tripFormData, [id]: value });
    // console.log(tripFormData);
  }

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // console.log(tripFormData)
    
    try {
      const numAdults = parseInt(tripFormData.adults)
      const { data: itinerary } = await updateTrip({
        variables: {tripInfo: {...tripFormData, adults: numAdults}, tripId},
      });
      // console.log(itinerary);
      delete itinerary.updateTrip.__typename;
      const { data } = await addItinerary({
        variables: { itinerary: {...itinerary.updateTrip}, tripId }
      });

      // console.log(data);
      await onHide(false);

    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }

    // setProfileFormData({
    //   originLocationCode: "",
    //   destinationLocationCode: "",
    //   departureDate: "",
    //   returnDate: "",
    //   adults: "",
    // })
  }
  const [themeState] = useTheme();
  const tripInfoStyles = {
    background: themeState.darkTheme ? 'linear-gradient(172deg, rgba(13,107,204,1) 17%, rgba(137,186,241,1) 63%, rgba(186,206,235,1) 79%, rgba(218,224,241,1) 89%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)',
		color: themeState.darkTheme ? 'white' : 'white',
  };
  const buttonStyles = {
    background: themeState.darkTheme ? `linear-gradient(313deg, rgba(13,107,204,1) 17%, rgba(218,224,241,1) 99%)` : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
    color: themeState.darkTheme ? 'white' : 'white',
  }


  return (

    <div className="absolute inset-0  w-full flex items-center justify-center">
      <div className="relative text-center rounded-custom shadow-custom max-w-md w-full" style={tripInfoStyles}>
        <h2 className="text-2xl text-center text-white font-semibold mb-4">Plan Your Trip to {name}!</h2>

        <div className="mb-4">
          <label htmlFor="originLocationCode" className="block text-sm font-medium text-white">From</label>
          <input onChange={handleInputChange} placeholder="Dallas" type="text" id="originLocationCode" className="mt-1 rounded-custom bg-white text-black text-center p-2 border w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="destinationLocationCode" className="block text-sm font-medium text-">To</label>
          <input onChange={handleInputChange} type="text" placeholder={name} id="destinationLocationCode" className="mt-1 rounded-custom bg-white text-black text-center p-2 border   w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="departureDate" className="block text-sm font-medium text-white">Departure Date</label>
          <input onChange={handleInputChange} type="date" id="departureDate" className="mt-1 text-black text-center rounded-custom bg-white p-2 border   w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="returnDate" className="block text-sm font-medium text-white">Return Date</label>
          <input onChange={handleInputChange} type="date" id="returnDate" className="mt-1 text-black text-center rounded-custom bg-white p-2 border   w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="adults" className="block text-sm font-medium text-white">Adults</label>
          <input onChange={handleInputChange} type="number" id="adults" className="mt-1 text-black text-center rounded-custom bg-white p-2 border  w-72" />
        </div>

        <div className="flex justify-center">
          <button onClick={handleFormSubmit} className=" rounded-custom px-4 py-2 border border-black mr-2" style={buttonStyles}>Submit</button>
          <button className="bg-gray-300 text-white px-4 py-2 rounded-md" onClick={onHide}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default TripInfoModal;





