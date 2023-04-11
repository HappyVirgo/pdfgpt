import React from "react";
import StarSvg from "../../../assets/svg/star.svg";
import Lightning1 from "../../../assets/svg/lightning1.svg";
import Lightning2 from "../../../assets/svg/lightning2.svg";
import Ultimate from "../../../assets/svg/ultimate.svg";

type PlanCardDetailProps = {
  type: "Basic" | "Advanced" | "Ultimate";
  name: string;
  pages: number;
  mega: number;
  pdf: number;
  question: number;
  users: number;
  size: number;
  connector: string;
};

const PlanCardDetail: React.FC<PlanCardDetailProps> = ({
  type,
  name,
  pages,
  mega,
  pdf,
  question,
  users,
  size,
  connector,
}) => {
  return (
    <div
      className={`rounded-md w-full px-4 pt-4 pb-10 mb-2 xl:max-w-[320px] lg:max-w-[320px] max-w-[auto] ${
        type === "Ultimate" ? "bg-white relative" : "bg-darkPurple"
      }`}
    >
      <p
        className={`font-medium text-lg mt-1 mb-3 flex justify-center items-center ${
          type === "Ultimate" ? "text-black" : "text-white"
        }`}
      >
        {type !== "Basic" && (type === "Advanced" ? <Lightning1 /> : <Lightning2 />)}
        <span className={type !== "Basic" ? "ml-2" : ""}>{type}</span>
      </p>
      {type === "Ultimate" && (
        <span className="absolute top-1 right-2">
          <Ultimate />
        </span>
      )}
      {type !== "Basic" && (
        <div>
          <div
            className={`font-medium text-3xl mt-8 pl-6 flex items-center ${
              type === "Ultimate" ? "text-black" : "text-white"
            }`}
          >
            $18
            <hr className={`w-0.5 h-6 mx-6 ${type === "Ultimate" ? "bg-black" : "bg-white"}`} />
            <span className="text-xl font-normal">Month</span>
          </div>
          <button type="button" className="bg-purple rounded-md p-3 my-10 w-full text-white">
            Pay now
          </button>
        </div>
      )}
      <hr />
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{name}</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{pages} pages/PDF</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{mega} MB/PDF</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{pdf} PDFs/day</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{question} questions/day</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{users} user</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{size} MB storage</p>
      </div>
      <div className="pt-4 flex">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{connector} connectors</p>
      </div>
    </div>
  );
};

export default PlanCardDetail;
