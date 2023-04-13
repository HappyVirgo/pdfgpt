import React, { useContext, useState } from "react";
import StarSvg from "../../../assets/svg/star.svg";
import Lightning1 from "../../../assets/svg/lightning1.svg";
import Lightning2 from "../../../assets/svg/lightning2.svg";
import Ultimate from "../../../assets/svg/ultimate.svg";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { AuthContext } from "../../../layout/AuthContextProvider";
import { toast } from "react-toastify";

type PlanCardDetailProps = {
  id: number;
  productId?: string;
  isAnnual?: boolean;
  type: "Basic" | "Advanced" | "Ultimate";
  name: string;
  pages: number;
  mega: number;
  pdf: number;
  question: number;
  users: number;
  size: number;
  price: number;
  connector: string;
};

const PlanCardDetail: React.FC<PlanCardDetailProps> = ({
  id,
  productId,
  type,
  name,
  pages,
  mega,
  pdf,
  question,
  users,
  size,
  price,
  connector,
  isAnnual,
}) => {
  const [loading, setLoading] = useState(false);
  const { user, tokens } = useContext(AuthContext);
  const handlePay = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASEURL}/subscription/create-checkout-session`,
        {
          price_id: productId,
          success_url: "http://localhost:3000/plan",
          cancel_url: "http://localhost:3000/plan",
        },
        {
          headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
        }
      );
    } catch (error: any) {
      toast(error?.response?.data?.message ?? "Some thing went wrong");
    }
    setLoading(false);
  };

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
            className={`font-medium text-3xl mt-8 pl-6 flex justify-center items-center ${
              type === "Ultimate" ? "text-black" : "text-white"
            }`}
          >
            ${isAnnual ? price * 10 : price}
            <hr className={`w-0.5 h-6 mx-6 ${type === "Ultimate" ? "bg-black" : "bg-white"}`} />
            <span className="text-xl font-normal">{isAnnual ? "Year" : "Month"}</span>
          </div>
          {user && (
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 p-3 my-10 text-white rounded-md ${
                user.current_plan_id === id ? "bg-red-400" : "bg-purple"
              }`}
              onClick={handlePay}
            >
              {user.current_plan_id === id ? "Cancel Plan" : "Pay now"}
              {loading && <ScaleLoader color="#A5D7E8" loading={loading} width={2} height={16} />}
            </button>
          )}
        </div>
      )}
      <div className="flex pt-4 mt-5">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{name}</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{pages} pages/PDF</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{mega} MB/PDF</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{pdf} PDFs/day</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{question} questions/day</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{users} user</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{size} MB storage</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className={`ml-3 ${type === "Ultimate" ? "text-black" : "text-white"}`}>{connector} connectors</p>
      </div>
    </div>
  );
};

export default PlanCardDetail;
