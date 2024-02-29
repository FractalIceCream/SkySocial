import { useState } from "react";
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_TRIP } from "../utils/mutation";
import ItineraryModal from "./ItineraryModal";
import { useTheme } from "../utils/ThemeContext";

const Itinerary = ({ itinerary }) => {

	const [isOpen, setIsOpen] = useState(false);
	const [itineraryModal, setItineraryModal] = useState({});
	const [removeTrip, { err, Data }] = useMutation(REMOVE_TRIP, {
		refetchQueries: [QUERY_ME],
	});

	const [themeState] = useTheme();

	const itineraryStyles = {
		background: themeState.darkTheme ? 'linear-gradient(172deg, rgba(13,107,204,1) 17%, rgba(137,186,241,1) 63%, rgba(186,206,235,1) 79%, rgba(218,224,241,1) 89%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)',
		color: themeState.darkTheme ? 'white' : 'white',
	}
	const innerItineraryStyles = {
		background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(183,226,255,1) 17%, rgba(235,240,249,1) 75%, rgba(218,224,241,1) 100%)' : 'linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)',

		color: themeState.darkTheme ? '#333' : '#333',

	}
	const buttonStyles = {
		background: themeState.darkTheme ? `linear-gradient(313deg, rgba(13,107,204,1) 17%, rgba(218,224,241,1) 99%)` : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
		color: themeState.darkTheme ? 'white' : 'white',
	}
	const handleTripModal = (tripinfo) => {
		setItineraryModal(tripinfo);
		setIsOpen(!isOpen);
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
	return (
		<div className="box-border  h-wishlist-height w-itinerary-width  flex-wrap flex-auto items-center justify-center rounded-custom shadow-2xl" style={itineraryStyles}>
			<div className="text-2xl">
				<h2 className="text-center">Itinerary</h2>
			</div>
			<div className="m-4 border border-black flex h-inner-itinerary-height w-inner-itinerary-width flex-col items-center justify-start rounded-custom  p-4 shadow-inner-strong " style={innerItineraryStyles}>
			{itinerary && itinerary.map((tripinfo) => (
				<div key={tripinfo._id} className="flex justify-start mt-4 w-auto h-auto items-center rounded-custom" style={buttonStyles}>
					<div className="flex justify-center items-start w-12 h-12">
						<button
							onClick={() => handleRemoveTrip(tripinfo._id)}
							className="text-md mt-2 text-center"> x </button>
					</div>
					<div className="flex justify-center items-start w-auto h-auto">
						<button
							key={tripinfo._id}
							onClick={() => handleTripModal(tripinfo)}
							className=" flex h-10 w-40 items-center justify-center rounded-custom">
							<p className="font-semibold">{tripinfo.name}</p></button>
					</div>
				</div>))}
			</div>
		{isOpen && (
			<div>
				<ItineraryModal tripId={itineraryModal._id} tripInfo={itineraryModal} name={itineraryModal.name} onHide={() => setIsOpen(false)} />
			</div>)}
		</div>
	);
};

export default Itinerary;

