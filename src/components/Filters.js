import React, { useContext, useRef } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Filters = () => {
  const { setCurrency } = useContext(CryptoContext);

  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    const val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  return (
    <div className="w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative">
      <Search />
      <div className="flex mr-7">
        <form
          className="relative flex items-center font-nunito mr-12"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="flex justify-center items-center mr-2 font-bold"
          >
            Currency:
          </label>
          <input
            type="text"
            name="currency"
            id="currency"
            placeholder="usd"
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
            ref={currencyRef}
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={submitIcon} alt="submitIcon" className="w-full h-auto" />
          </button>
        </form>
      </div>
      <div>sorting</div>
    </div>
  );
};

export default Filters;
