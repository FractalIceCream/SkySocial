import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import  AuthService from '../utils/auth'
import { QUERY_ME } from '../utils/queries';
import { useTheme } from "../utils/ThemeContext";
// import { CREATE_TRIP } from "../utils/mutation";

// able to createTrip but not populating itinerary with created trip yet

const Itinerary = ({
	itinerary
}) => {
	// 	encountering error here
	//   if (!itinerary.length) {
	//     return <h3>No itinerary Yet</h3>
	//   }

	const [showInputBox, setShowInputBox] = useState(false);
	const [inputState, setInputState] = useState('');
	const [itineraryItem, setitineraryItem] = useState()

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

	const handleInputChange = (event) => {
		// console.log(event.target.value)
		const city = event.target.value

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
					variables: 
					{name: inputState} ,
				});

				setInputState('');
				setShowInputBox(false)
			}

		} catch (error) {
			console.error(error)
		}
	}


	return (
		<div className="box-border h-itinerary-height w-itinerary-width flex-wrap items-center justify-center rounded-custom shadow-2xl" style={itineraryStyles}>
			<div className="text-2xl font-semibold">
				<h2 className="text-center">Itinerary</h2>
			</div>

			<div className="mt-2 box-border flex h-inner-itinerary-height w-inner-itinerary-width flex-col items-center justify-start rounded-custom p-4 shadow-inner-strong">
				{itinerary &&
					itinerary.map((tripinfo) => (
						<button key={tripinfo._id} className="mb-5 flex h-10 w-40 items-center justify-center rounded-custom bg-green-200">
							<p className="font-semibold text-black">{tripinfo.name}</p>
						</button>
					))
				}
				{/* We will need to add with the Queried Data to this area here and when the button is produced, it should then trigger the Modal to start the Itinerary */}
			</div>
			<div className="flex items-center justify-evenly">
				<button className="h-4 w-4 rounded-full bg-black"></button>
				<button className="ml-5 h-20 w-20 text-xl font-semibold" onClick={() => setShowInputBox(true)}>
					Add Trip
				</button>

				{showInputBox && (
					<form >
						<input
							type="text"
							placeholder="Enter itinerary destination"
							value={inputState}
							onChange={handleInputChange}
						/>
						<button onClick={handleFormSubmit}> Add Trip </button>
					</form>
				)}

			</div>
		</div>
	);
};

export default Itinerary;

