import React from "react";
import StarSvg from "../../../assets/svg/star.svg";

const PlanCard = () => {
  const features = [
    "Free plan",
    "120 pages/PDF",
    "10 MB/PDF",
    "3 PDFs/day",
    "50 questions/day",
    "1 user",
    "50 MB storage",
    "0 connectors",
  ];

  return (
    <div className="bg-bgRadialStart rounded-md p-2.5">
      <p className="text-center text-white font-medium text-lg my-3">Basic</p>
      <hr />
      <div className="py-3">
        {features.map((name, index) => (
          <div key={index} className="flex m-3">
            <StarSvg />
            <p className="ml-3 text-white">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
