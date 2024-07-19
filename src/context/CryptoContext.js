import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);

  const getCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-api-key": "CG-Pgviptiz4NS7BA84fMZXP1wB",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d`,
        options
      );
      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetFunc = () => {
    setPage(1);
    setCoinSearch("");
  };

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
        `https://api.coingecko.com/api/v3/coins/list`,
        options
      );
      const data = await response.json();
      setTotalPages(data.length);
    } catch (err) {
      console.error(err);
    }
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d`,
        options
      );
      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSearchResult = async (query) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-api-key": "CG-Pgviptiz4NS7BA84fMZXP1wB",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        options
      );
      const data = await response.json();
      setSearchData(data.coins);
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunc,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
