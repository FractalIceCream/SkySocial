import { useQuery } from "@apollo/client";
import { QUERY_AGGREGATE_TRIPS } from "../../utils/queries";
import { useTheme } from "../../utils/ThemeContext";

const TripContainer = () => {

    const [themeState] = useTheme();

    const tripContainerStyles = {
        background: themeState.darkTheme ? 'linear-gradient(172deg, rgba(13,107,204,1) 17%, rgba(137,186,241,1) 63%, rgba(186,206,235,1) 79%, rgba(218,224,241,1) 89%)' : 'linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)',
        color: themeState.darkTheme ? 'white' : 'white',
    }
    const innerTripStyles = {
        background: themeState.darkTheme ? 'linear-gradient(180deg, rgba(183,226,255,1) 17%, rgba(235,240,249,1) 75%, rgba(218,224,241,1) 100%)' : 'linear-gradient(180deg, rgba(34,34,34,1) 28%, rgba(62,62,62,1) 58%, rgba(87,87,87,0.8547794117647058) 100%)',

        color: themeState.darkTheme ? '#333' : '#333',

    }
    const buttonStyles = {
        background: themeState.darkTheme ? `linear-gradient(313deg, rgba(13,107,204,1) 17%, rgba(218,224,241,1) 99%)` : `linear-gradient(180deg, rgba(0,0,0,1) 22%, rgba(40,39,39,1) 63%, rgba(79,78,78,0.8855917366946778) 100%)`,
        color: themeState.darkTheme ? 'white' : 'white',
    }

    const { loading, error, data } = useQuery(QUERY_AGGREGATE_TRIPS);

    return (
        <div className="border mt-4 border-black flex h-wishlist-height w-wishlist-width flex-col items-center justify-evenly rounded-custom  shadow-2xl shrink" style={tripContainerStyles}>
            <div className="text-2xl mt-2 mb-4">
                <h2>Wishful Trip Count</h2>
            </div>
            <div className="shadow-inner-strong rounded-custom h-2/3 w-2/3 overflow-y-auto "
                style={{
                    overflow: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "transparent transparent",
                    msOverflowStyle: "none",
                }}>
                <div className=" flex p-2  flex-col items-center justify-start rounded-custom  "
                    style={{
                        overflow: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "transparent transparent",
                        msOverflowStyle: "none",
                        innerTripStyles
                    }}>
                {data && data?.aggregateTrips.map((trip) => (
                    <div key={trip.name} className="w-auto overflow-auto-y px-4">
                        <div className=" flex justify-center p-3 mt-4 items-center rounded-custom" style={buttonStyles}>
                            <div className="flex text-center">
                                <button className=" h-auto w-32  justify-center items-center flex text-center rounded-custom">
                                    <p className="font-semibold  ">{trip.name}</p>
                                </button>
                            </div>
                            <div className="flex justify-center items-start h-auto  ml-2">
                            <button className="text-md text-center" style={{ textDecoration: 'none', }}>{trip.count}</button>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
};

export default TripContainer;