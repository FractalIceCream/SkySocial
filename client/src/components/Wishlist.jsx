import React, { useState } from "react";
import { useParams } from 'react-router-dom';

import { QUERY_WISHLIST } from '../utils/queries';
import { useQuery } from "@apollo/client";

const Wishlist = ({
  wishlist
}) => {
  if (!wishlist.length) {
    return <h3>No Wishlist Yet</h3>
  }

	return (
		<div class="box-border flex h-wishlist-height w-wishlist-width flex-wrap items-center justify-center rounded-custom bg-gray shadow-2xl">
			<div class="text-2xl font-semibold text-white">
				<h2>Wishlist</h2>
			</div>

			<div class="mt-2 box-border flex h-inner-wishlist-height w-inner-wishlist-width flex-col items-center justify-start rounded-custom bg-gray-dark p-4 shadow-inner-strong">
        {wishlist &&
          wishlist.map((tripinfo) => (
            <button key={tripinfo._id} class="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
            <p class="font-semibold text-black">{tripinfo.name}</p>
            </button>
          ))
        }
					{/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}
			</div>
			<div class="flex items-center justify-evenly">
				<button class="h-4 w-4 rounded-full bg-black"></button>
				<button class="ml-5 h-20 w-20 text-xl font-semibold text-white">
					Add Trip
				</button>
			</div>
		</div>
	);
};

export default Wishlist;
