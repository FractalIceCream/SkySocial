import { useQuery } from "@apollo/client";
import { QUERY_AGGREGATE_TRIPS } from "../../utils/queries";


const TripContainer = () => {

    const { loading, error, data } = useQuery(QUERY_AGGREGATE_TRIPS);

    return (
        <div className="box-border flex h-wishlist-height w-wishlist-width flex-col items-center justify-evenly rounded-custom bg-gray shadow-2xl mr-12">
            <div className="text-2xl font-semibold text-white mb-4">
                <h2>Wishful Trip Count</h2>
            </div>

            <div className="mt-2 overflow-y-auto box-border flex h-inner-wishlist-height w-full flex-col items-center justify-start rounded-custom bg-gray-dark py-2 shadow-inner-strong"
            style={{
                overflow: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
                msOverflowStyle: "none",
            }}>
                {data &&
                    data?.aggregateTrips.map((trip) => (
                        <div key={trip.name} className="w-full px-4">
                            <div className="bg-green-200 flex justify-center mt-4 items-center rounded-custom">
                                <div className="flex text-center">
                                    <button className=" h-32 justify-start items-center flex text-center rounded-custom bg-green-200">
                                        <p className="font-semibold pt-3 text-black">
                                            {trip.name}
                                        </p>
                                    </button>
                                </div>
                                <div className="flex justify-center items-start h-12 px-2">
                                    <button className="text-md text-center">
                                        {trip.count}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TripContainer;