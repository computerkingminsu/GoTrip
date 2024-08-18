import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MdOutlineAttachMoney } from 'react-icons/md';

interface ExchangeRateProps {
  currency: string;
  countryCode: string;
}

const fetchExchangeRate = async (currency: string): Promise<number> => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGERATE_API}/latest/${currency}`,
  );
  return response.data.conversion_rates.KRW;
};

export default function ExchangeRate({
  currency,
  countryCode,
}: ExchangeRateProps) {
  const { data: exchangeRate, isLoading: exchangeRateLoading } = useQuery({
    queryKey: ['exchangeRate', countryCode],
    queryFn: () => fetchExchangeRate(currency),
    enabled: !!currency,
  });

  return (
    <article className="bg-[#1F2232] p-6 rounded-lg w-full sm:w-[32.5%]">
      <header className="text-xl mb-4 flex items-center">
        <MdOutlineAttachMoney className="text-[#00C395] mr-2 text-2xl" />
        <span className="text-white text-base">Exchange Rate</span>
      </header>
      {exchangeRateLoading ? (
        <div className="flex justify-center items-center h-12">
          <CircularProgress style={{ color: '#00C395' }} />
        </div>
      ) : exchangeRate ? (
        <div className="flex justify-center items-center text-white h-12">
          <MdOutlineAttachMoney className="text-4xl text-[#00C395]" />
          <div className="text-lg">
            1 {currency} = {exchangeRate} KRW
          </div>
        </div>
      ) : (
        <div className="text-white h-12">Error loading exchange rate data</div>
      )}
    </article>
  );
}
