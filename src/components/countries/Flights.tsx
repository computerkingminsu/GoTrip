import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import Amadeus from 'amadeus';
import { format, addDays } from 'date-fns';
import { PiAirplaneTakeoff } from 'react-icons/pi';

interface Flight {
  itineraries: {
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
      };
    }[];
  }[];
}

interface FlightData {
  date: string;
  flights: Flight[];
}

interface FlightsProps {
  airportCode: string;
  countryCode: string;
}

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API || '',
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET || '',
});

const fetchFlights = async (
  airportCode: string,
  dates: string[],
): Promise<FlightData[]> => {
  const allFlights: FlightData[] = [];

  for (const date of dates) {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'ICN',
      destinationLocationCode: airportCode,
      departureDate: date,
      adults: '1',
    });
    allFlights.push({ date, flights: response.data });
  }

  return allFlights;
};

export default function Flights({ airportCode, countryCode }: FlightsProps) {
  const [showMore, setShowMore] = useState(false);

  const { data: flights = [], isLoading: flightsLoading } = useQuery({
    queryKey: ['flights', countryCode],
    queryFn: () =>
      fetchFlights(airportCode, [format(addDays(new Date(), 1), 'yyyy-MM-dd')]),
    enabled: !!airportCode,
  });

  const {
    data: additionalFlights = [],
    isLoading: additionalFlightsLoading,
    refetch: fetchAdditionalFlights,
  } = useQuery({
    queryKey: ['additionalFlights', countryCode],
    queryFn: () =>
      fetchFlights(airportCode, [
        format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      ]),
    enabled: false,
  });

  const renderFlights = (flights: FlightData[]) => {
    return flights.map(({ date, flights }) => {
      const filteredFlights = flights.filter(
        (flight) =>
          flight.itineraries[0].segments[0].arrival.iataCode === airportCode,
      );

      if (filteredFlights.length === 0) {
        return (
          <div key={date} className="mb-4 w-full">
            <div className="text-white mb-2 text-base">{date}</div>
            <div className="text-white">There is no flight schedule</div>
          </div>
        );
      }

      return (
        <div key={date} className="mb-4 w-full">
          <div className="text-white mb-2 text-base">{date}</div>
          <div className="flex flex-wrap">
            {filteredFlights.map((flight, index) => (
              <div key={index} className="w-1/4 p-1">
                <div className="text-white text-base">
                  * {flight.itineraries[0].segments[0].departure.iataCode} →
                  {flight.itineraries[0].segments[0].arrival.iataCode} at{' '}
                  {flight.itineraries[0].segments[0].departure.at}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="bg-[#1F2232] pt-6 pl-6 pr-6 pb-3 rounded-lg min-h-[14.5rem]">
      <header className="text-xl mb-4 flex items-center">
        <PiAirplaneTakeoff className="text-[#00C395] mr-2 text-2xl" />
        <span className="text-white text-base">Airplane Schedule</span>
      </header>
      {flightsLoading ? (
        <div className="flex justify-center items-center h-12">
          <CircularProgress style={{ color: '#00C395' }} />
        </div>
      ) : (
        <div className="flex flex-wrap text-base">{renderFlights(flights)}</div>
      )}
      {!showMore && !flightsLoading && (
        <footer className="text-center mt-3">
          <button
            onClick={() => {
              fetchAdditionalFlights();
              setShowMore(true);
            }}
            className="text-[#00C395] text-base"
          >
            더 알아보기
          </button>
        </footer>
      )}
      {showMore && additionalFlightsLoading && (
        <div className="text-center">
          <CircularProgress style={{ color: '#00C395' }} />
        </div>
      )}
      {showMore && (
        <div className="flex flex-wrap">{renderFlights(additionalFlights)}</div>
      )}
    </section>
  );
}
