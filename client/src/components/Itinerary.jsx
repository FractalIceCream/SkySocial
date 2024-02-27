import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import AuthService from '../utils/auth'
import { QUERY_ME } from '../utils/queries';
import { REMOVE_TRIP } from "../utils/mutation";
import ItineraryModal from "./ItineraryModal";
import { useTheme } from "../utils/ThemeContext";
// import { CREATE_TRIP } from "../utils/mutation";

// able to createTrip but not populating itinerary with created trip yet

const Itinerary = ({ itinerary }) => {
	// 	encountering error here
	//   if (!itinerary.length) {
	//     return <h3>No itinerary Yet</h3>
	//   }

	const [showInputBox, setShowInputBox] = useState(false);
	const [inputState, setInputState] = useState('');
	const [itineraryItem, setitineraryItem] = useState()
	const [isOpen, setIsOpen] = useState(false);
	const [itineraryModal, setItineraryModal] = useState({});
	const [removeTrip, { err, Data }] = useMutation(REMOVE_TRIP, {
		refetchQueries: [QUERY_ME, "me"],
	  });

	const [themeState] = useTheme();

	const itineraryStyles = {
		background: themeState.darkTheme ? '#333' : '#fff',
		color: themeState.darkTheme ? '#fff' : '#333',
		// Add other styles as needed
	}

	// const [createTrip, { error, data }] = useMutation(CREATE_TRIP,
	// 	{
	// 		refetchQueries: [
	// 			QUERY_ME,
	// 			'me'
	// 		]
	// 	});
	const handleTripModal = (tripinfo) => {
		// console.log(tripinfo);
		setItineraryModal(tripinfo);
		setIsOpen(!isOpen);
		// console.log(itineraryModal);
	}

	const handleRemoveTrip = async (tripId) => {
		try {
		  const { data } = await removeTrip({
			variables: { tripId },
		  });
		} catch (error) {
		  console.error("Error removing trip", error);
		}
	  };
	// const handleInputChange = (event) => {
	// 	// console.log(event.target.value)
	// 	const city = event.target.value

	// 	setInputState(city);
	// 	// console.log(city)
	// };

	// const handleFormSubmit = async (event) => {
	// 	event.preventDefault();

	// 	try {

	// 		const authUser = AuthService.getProfile();
	// 		if (!authUser) {
	// 			console.error("User not authenticated");
	// 		} else {
	// 			const { data } = await createTrip({
	// 				variables:
	// 					{ name: inputState },
	// 			});

	// 			setInputState('');
	// 			setShowInputBox(false)
	// 		}

	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }


	return (
		<div className="box-border h-itinerary-height w-itinerary-width flex-wrap items-center justify-center rounded-custom shadow-2xl" style={itineraryStyles}>
			<div className="text-2xl font-semibold">
				<h2 className="text-center">Itinerary</h2>
			</div>

			<div className="m-4 box-border flex h-inner-itinerary-height w-inner-itinerary-width flex-col items-center justify-start rounded-custom bg-gray-dark p-4 shadow-inner-strong">
				{itinerary &&
					itinerary.map((tripinfo) => (
						<div key={tripinfo._id} className="bg-green-200 flex justify-start mt-4 w-32 h-32 items-center rounded-custom">
							<div className="flex justify-center items-start w-12 h-12">
								<button
									onClick={() => handleRemoveTrip(tripinfo._id)}
									className="text-md text-center"> x </button>
							</div>
							<div className="flex justify-center items-start w-12 h-12">
								<button
									key={tripinfo._id}
									onClick={() => handleTripModal(tripinfo)}
									className="mb-2 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
									<p className="font-semibold text-black">{tripinfo.name}</p></button>
							</div>
						</div>
					))
				}

				{/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}
			</div>
			{isOpen && (
				<div>
					<ItineraryModal tripId={itineraryModal._id} tripInfo={itineraryModal} name={itineraryModal.name} onHide={() => setIsOpen(false)} />
					<button onClick={() => setIsOpen(false)}>Close Modal</button>
				</div>
			)}
		</div>
	);
};

export default Itinerary;

