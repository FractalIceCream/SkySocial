

import React, { useState } from "react";






const Wishlist = () => {




return (
  <div class="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom bg-gray shadow-2xl">
  <div class="text-2xl font-semibold text-white"><h2>Wishlist</h2></div>

  <div class="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom bg-gray-dark p-4 shadow-inner-strong">
  <button class="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
          <p class="font-semibold text-black">Tokyo</p>

 {/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}


        </button>








  </div>
  <div class="flex items-center justify-evenly">
    <button class="h-4 w-4 rounded-full bg-black"></button>
    <button class="ml-5 h-20 w-20 text-xl font-semibold text-white">Add Trip</button>
  </div>
</div>

)






}



export default Wishlist;