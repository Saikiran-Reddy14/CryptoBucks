import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();

  const getCryptoData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-api-key": "CG-Pgviptiz4NS7BA84fMZXP1wB",
      },
    };

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d",
        options
      );
      const data = await response.json();
      console.log(data);
      setCryptoData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, setCryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};
