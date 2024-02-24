import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRIP } from "../../utils/mutation";
import Auth from "../utils/auth";






const TripInfoModal = () => {

  const [profileFormData, setProfileFormData] = useState({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: "",
    returnDate: "",
    adults: "",
  });


return (




<div class="fixed inset-0 z-50 flex items-center rounded-custom justify-center">
  <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
  <div class="relative text-cen z-50 bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl text-center font-semibold mb-4">Plan Your Trip!</h2>
    
   
    <div class="mb-4">
      <label for="originLocationCode" class="block text-center text-sm font-medium text-gray-600">From</label>
      <input placeholder="Dallas" type="text" id="originLocationCode" class="mt-1 text-center p-2 border rounded-md w-full" />
    </div>
    
   
    <div class="mb-4">
      <label for="destinationLocationCode" class="block text-center text-sm font-medium text-gray-600">To</label>
      <input type="text" placeholder="New York" id="destinationLocationCode" class="mt-1 text-center p-2 border rounded-md w-full" />
    </div>
    

    <div class="mb-4">
      <label for="departureDate" class="block text-sm font-medium text-gray-600">Departure Date</label>
      <input type="date" id="departureDate" class="mt-1 p-2 border rounded-md w-full" />
    </div>
    
    
    <div class="mb-4">
      <label for="returnDate" class="block text-sm font-medium text-gray-600">Return Date</label>
      <input type="date" id="returnDate" class="mt-1 p-2 border rounded-md w-full" />
    </div>
    
  
    <div class="mb-4">
      <label for="adults" class="block text-sm font-medium text-gray-600">Adults</label>
      <input type="number" id="adults" class="mt-1 p-2 border rounded-md w-full" />
    </div>
    
  
    <div class="flex justify-end">
      <button class="bg-gray-light text-white px-4 py-2 rounded-md mr-2">Submit</button>
      <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
    </div>
  </div>
</div>

)

}







