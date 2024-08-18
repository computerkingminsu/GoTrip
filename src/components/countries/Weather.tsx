import React from 'react';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TiWeatherPartlySunny } from 'react-icons/ti';

interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

interface WeatherProps {
  capital: string;
  countryCode: string;
}

const fetchWeather = async (capital: string): Promise<Weather> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}`,
  );
  return response.data;
};

export default function Weather({ capital, countryCode }: WeatherProps) {
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ['weather', countryCode],
    queryFn: () => fetchWeather(capital),
    enabled: !!capital,
  });

  return (
    <article className="bg-[#1F2232] p-6 rounded-lg w-full sm:w-[32.5%] mb-6 sm:mb-0">
      <header className="text-xl mb-4 flex items-center">
        <TiWeatherPartlySunny className="text-[#00C395] mr-2 text-2xl" />
        <span className="text-white text-base">Weather</span>
      </header>
      {weatherLoading ? (
        <div className="flex justify-center items-center h-12">
          <CircularProgress style={{ color: '#00C395' }} />
        </div>
      ) : weather ? (
        <div className="flex justify-center items-center text-white h-12">
          <div className="text-lg">{weather.name}</div>
          <div className="relative w-20 h-20">
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="text-lg">{weather.main.temp}°</div>
        </div>
      ) : (
        <div className="text-white h-12 text-base">
          Error loading weather data
        </div>
      )}
    </article>
  );
}
