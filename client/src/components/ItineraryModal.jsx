import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITINERARY, UPDATE_TRIP } from "../utils/mutation";
import { QUERY_TRIPS_INFO } from "../utils/queries";
import Auth from '../utils/auth';

const ItineraryModal = ({ tripId, tripInfo, name, onHide }) => {
// { tripId, tripInfo, name, onHide }
  // const [profileFormData, setProfileFormData] = useState({
  //   originLocationCode: "",
  //   destinationLocationCode: "",
  //   departureDate: "",
  //   returnDate: "",
  //   adults: "",
  // });
  const [tripFormData, setTripFormData] = useState(tripInfo);

//   console.log(tripFormData);
  const [updateTrip, { error }] = useMutation(UPDATE_TRIP)
  const [addItinerary, { error : itineraryError }] = useMutation(ADD_ITINERARY);


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(`${id} : ${value}`);
    // if (id === 'adults') {
    //   const numAdults = parseInt(value);
    //   console.log(numAdults);
    //   setTripFormData({...tripFormData, adults: numAdults});
    //   console.log(tripFormData.adults);
    // }
    // console.log(`${id} ${value}`)
    event.target.value = value;
    setTripFormData({ ...tripFormData, [id]: value });
    // console.log(tripFormData);
  }

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // console.log(tripFormData)
    
    try {

        const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = tripFormData;
        // console.log(tripFormData.adults);
        // console.log(tripFormData.originLocationCode);
        // console.log(tripFormData.departureDate);
        // console.log(tripFormData.returnDate);
        // console.log(tripFormData.destinationLocationCode);
      const numAdults = parseInt(adults);
      const { data: itinerary } = await updateTrip({
        variables: {tripInfo: { 
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            adults: numAdults}, tripId},
      });
      delete itinerary.updateTrip.__typename;
      const { data } = await addItinerary({
        variables: { itinerary: {...itinerary.updateTrip}, tripId }
      });
    //   setTripFormData(data)
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

  return (

    <div className="absolute inset-0 w-full flex items-center justify-center">
      <div className="relative text-center bg-gray rounded-custom shadow-custom max-w-md w-full">
        <h2 className="text-2xl text-center text-white font-semibold mb-4">Trip Itinerary to {name}!</h2>

        <div className="mb-4 flex flex-col items-center justify-center ">
          <label htmlFor="departureDate" className="block text-md font-medium text-white">Departure Date: {tripFormData.itinerary.departureDate}</label>
          <label htmlFor="departureCode" className="block text-md font-medium text-white">Departure Airport: {tripFormData.itinerary.departureCode}</label>
          <label htmlFor="arrivalDate" className="block text-md font-medium text-white">Arrival Date: {tripFormData.itinerary.arrivalDate}</label>
          <label htmlFor="arrivalCode" className="block text-md font-medium text-white">Arrival Airport: {tripFormData.itinerary.arrivalCode}</label>
          <label htmlFor="price" className="block text-md font-medium text-white">Price: ${tripFormData.itinerary.price}</label>
          <h2>Update Your Trip Below!</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="originLocationCode" className="block text-sm font-medium ">From</label>
          <input onChange={handleInputChange} type="text" placeholder="city" id="originLocationCode" className="mt-1 rounded-custom bg-white text-black text-center p-2 border  w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="destinationLocationCode" className="block text-sm font-medium ">To</label>
          <input onChange={handleInputChange} type="text" placeholder={tripFormData.name} id="destinationLocationCode" className="mt-1 rounded-custom bg-white text-black text-center p-2 border  w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="departureDate" className="block text-sm font-medium ">Departure Date</label>
          <input onChange={handleInputChange} type="date" value={tripFormData.departureDate} id="departureDate" className="mt-1 text-black rounded-custom bg-white p-2 border  w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="returnDate" className="block text-sm font-medium ">Return Date</label>
          <input onChange={handleInputChange} type="date" value={tripFormData.returnDate} id="returnDate" className="mt-1 text-black rounded-custom bg-white p-2 border  w-72" />
        </div>

        <div className="mb-4">
          <label htmlFor="adults" className="block text-sm font-medium ">Adults</label>
          <input onChange={handleInputChange} type="number" value={parseInt(tripFormData.adults)} id="adults" className="mt-1 text-center text-black rounded-custom bg-white p-2 border  w-72" />
        </div>

        <div className="flex justify-center">
          <button onClick={handleFormSubmit} className="bg-green-200 text-black rounded-custom px-4 py-2  mr-2">Update</button>
          <button className="bg-gray-300  px-4 py-2 " onClick={onHide}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ItineraryModal;


