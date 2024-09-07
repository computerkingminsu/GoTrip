'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { countriesData } from '@/app/countriesData';
import Link from 'next/link';
import { GrAttraction } from 'react-icons/gr';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExchangeRate from '@/components/countries/ExchageRate';
import Flights from '@/components/countries/Flights';
import Weather from '@/components/countries/Weather';
import AQI from '@/components/countries/AQI';
import ReactQueryProvider from '@/lib/ReactQueryProvider';

interface Attraction {
  image: string;
  name: string;
  description: string;
}

export default function Countries() {
  const pathname = usePathname();
  const countryCode = pathname.split('/').pop();
  //@ts-ignore
  const countryData = countriesData[countryCode];

  // 캐러셀 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 0.999,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <main className="min-w-screen min-h-screen h-full bg-[#151825]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden sm:inline-block w-1/6 mt-[9.5vh] px-10 space-y-8">
          {Object.values(countriesData).map((country) => (
            <Link
              key={country.code}
              href={`/countries/${country.lowername}`}
              className="block"
            >
              <div
                className={
                  pathname === `/countries/${country.lowername}`
                    ? 'text-[#00C395]'
                    : 'text-[#d8d8d8]'
                }
              >
                {country.name}
              </div>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <section className="w-full pl-6 pr-6 sm:w-5/6 mt-[7vh] sm:mt-[9.5vh] sm:mr-10">
          {/* 모바일 사이드바 */}
          <nav className="sm:hidden mb-9 overflow-x-auto no-scrollbar">
            <div className="flex space-x-4">
              {Object.values(countriesData).map((country) => (
                <Link
                  key={country.code}
                  href={`/countries/${country.lowername}`}
                >
                  <div
                    className={`text-base mr-5 ${
                      pathname === `/countries/${country.lowername}`
                        ? 'text-[#00C395]'
                        : 'text-[#d8d8d8]'
                    }`}
                  >
                    {country.name}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <header className="text-[#00C395] text-sm font-extralight mb-2">
            Country
          </header>
          <h1 className="text-white text-2xl font-bold mb-6">
            {countryData.name}
          </h1>

          {/* Attractions */}
          <section className="bg-[#1F2232] p-6 rounded-lg mb-6 text-base">
            <header className="text-xl mb-4 flex items-center">
              <GrAttraction className="text-[#00C395] mr-2 text-2xl" />
              <span className="text-white text-base">Attractions</span>
            </header>
            <Slider {...settings} className="w-full h-full custom-slider">
              {countryData.attractions.map(
                (attraction: Attraction, index: number) => (
                  <div key={index}>
                    <div className="flex text-white">
                      <div className="min-w-[40%] max-w-[40%] sm:min-w-[30%] sm:max-w-[30%] h-52 relative">
                        <Image
                          src={attraction.image}
                          alt={attraction.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,UklGRhYAAABXRUJQVlA4IC4AAACwAQCdASoCAAIALmk0mk0iIiIiIgBoSywAAmEAAKADAAQAA3AA/vuUAAA="
                        />
                      </div>
                      <div className="flex flex-col ml-9">
                        <div className="text-lg mb-3">{attraction.name}</div>
                        <div className="text-base 2xl:w-[80%]">
                          {attraction.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </Slider>
          </section>

          {/* Weather, AQI, Exchange Rate */}
          <section className="flex flex-col sm:flex-row justify-between mb-6">
            <Weather
              capital={countryData.capital}
              countryCode={countryCode || ''}
            />
            <AQI
              capital={countryData.capital}
              countryCode={countryCode || ''}
            />
            <ExchangeRate
              currency={countryData.money}
              countryCode={countryCode || ''}
            />
          </section>

          {/* Airplane Schedule */}
          <section className="bg-[#1F2232] rounded-lg min-h-[14.5rem]">
            <Flights
              airportCode={countryData.airport}
              countryCode={countryCode || ''}
            />
          </section>
        </section>
      </div>
    </main>
  );
}
