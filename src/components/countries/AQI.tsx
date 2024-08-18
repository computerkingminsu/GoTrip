import React from 'react';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TiWeatherWindyCloudy } from 'react-icons/ti';

interface AQI {
  aqi: number;
}

interface AQIProps {
  capital: string;
  countryCode: string;
}

const fetchAqi = async (capital: string): Promise<AQI> => {
  const response = await axios.get(
    `https://api.waqi.info/feed/${capital}/?token=${process.env.NEXT_PUBLIC_WAQI_API}`,
  );
  return response.data.data;
};

const getAqiIcon = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for sensitive groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export default function AQI({ capital, countryCode }: AQIProps) {
  const { data: aqi, isLoading: aqiLoading } = useQuery({
    queryKey: ['aqi', countryCode],
    queryFn: () => fetchAqi(capital),
    enabled: !!capital,
  });

  return (
    <article className="bg-[#1F2232] p-6 rounded-lg w-full sm:w-[32.5%] mb-6 sm:mb-0">
      <header className="text-xl mb-4 flex items-center">
        <TiWeatherWindyCloudy className="text-[#00C395] mr-2 text-2xl" />
        <span className="text-white text-base">Air Quality</span>
      </header>
      {aqiLoading ? (
        <div className="flex justify-center items-center h-12">
          <CircularProgress style={{ color: '#00C395' }} />
        </div>
      ) : aqi ? (
        <div className="flex justify-center items-center text-white h-12">
          <div className="relative w-14 h-14 mr-4">
            <Image
              src="/countries/aqi.png"
              alt="aqi icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative z-10 text-lg">
            {aqi.aqi} : {getAqiIcon(aqi.aqi)}
          </div>
        </div>
      ) : (
        <div className="text-white h-12 text-base">Error loading AQI data</div>
      )}
    </article>
  );
}
