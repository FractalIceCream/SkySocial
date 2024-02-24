import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRIP } from "../utils/mutation";







const TripInfoModal = ({ onHide }) => {

  const [profileFormData, setProfileFormData] = useState({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: "",
    returnDate: "",
    adults: "",
  });
  const [updateTrip, { error }] = useMutation(UPDATE_TRIP)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      console.log(profileFormData)
    try {
          const { data } = await updateTrip({
            variables: profileFormData,
          });
        } catch (err) {
          console.error(err);
        }

        setProfileFormData({
          originLocationCode: "",
          destinationLocationCode: "",
          departureDate: "",
          returnDate: "",
          adults: "",
        })
    }
  





  
return (




<div class="absolute top-1/2 right-0 w-full flex items-center justify-center">
  <div class="absolute inset-0 bg-modal"></div>
  <div class="relative text-center bg-modalbg rounded-custom shadow-custom max-w-md w-full">
    <h2 class="text-2xl text-center text-white font-semibold mb-4">Plan Your Trip!</h2>

    <div class="mb-4">
      <label for="originLocationCode" class="block text-sm font-medium text-black">From</label>
      <input onChange={handleInputChange} placeholder="Dallas" type="text" id="originLocationCode" class="mt-1 rounded-custom bg-white text-black text-center p-2 border rounded-md w-full" />
    </div>

    <div class="mb-4">
      <label for="destinationLocationCode" class="block text-sm font-medium text-black">To</label>
      <input onChange={handleInputChange} type="text" placeholder="New York" id="destinationLocationCode" class="mt-1 rounded-custom bg-white text-center p-2 border rounded-md w-full" />
    </div>

    <div class="mb-4">
      <label for="departureDate" class="block text-sm font-medium text-black">Departure Date</label>
      <input onChange={handleInputChange} type="date" id="departureDate" class="mt-1 text-black rounded-custom bg-white p-2 border rounded-md w-full" />
    </div>

    <div class="mb-4">
      <label for="returnDate" class="block text-sm font-medium text-black">Return Date</label>
      <input onChange={handleInputChange} type="date" id="returnDate" class="mt-1 text-black rounded-custom bg-white p-2 border rounded-md w-full" />
    </div>

    <div class="mb-4">
      <label for="adults" class="block text-sm font-medium text-black">Adults</label>
      <input onChange={handleInputChange} type="number" id="adults" class="mt-1 text-black rounded-custom bg-white p-2 border rounded-md w-full" />
    </div>

    <div class="flex justify-end">
      <button onClick={handleFormSubmit} class="bg-green-200 text-black rounded-custom px-4 py-2 rounded-md mr-2">Submit</button>
      <button class="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={onHide}>Cancel</button>
    </div>
  </div>
</div>


)


}

export default TripInfoModal;





