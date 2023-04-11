import React from "react";
import MasterCardIcon from "../../../assets/svg/masterCardIcon.svg";

function formatCardNumber(cardNumber: string) {
  const maskingSymbol = "•";
  const lastFourDigits = cardNumber.slice(-4);
  const maskedString = cardNumber.slice(0, -4).replace(/\d/g, maskingSymbol);
  const formattedString = `${maskedString} ${lastFourDigits}`;
  return formattedString;
}

function Card() {
  const cardNumber = "1234567811118490";

  return (
    <div className="bg-purple bg-gradient-to-b from-indigo-500 rounded-md p-6 text-white text-base">
      <p>YOUR NAME</p>
      <div className="mt-10">{formatCardNumber(cardNumber)}</div>
      <div className="mt-3 flex justify-between">
        <p>12/25</p>
        <MasterCardIcon />
      </div>
    </div>
  );
}

export default Card;
