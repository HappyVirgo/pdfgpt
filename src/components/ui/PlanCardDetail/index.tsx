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
  data: { [key: string]: any };
  isAnnual: boolean;
};

const PlanCardDetail: React.FC<PlanCardDetailProps> = ({ data, isAnnual }) => {
  const [loading, setLoading] = useState(false);
  const { user, tokens, setUser } = useContext(AuthContext);
  const handlePay = async () => {
    setLoading(true);
    if (user?.current_plan_id === data.id) {
      try {
        const { data: res } = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASEURL}/subscription/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${tokens?.accessToken}`,
            },
          }
        );
        setUser(res.user);
      } catch (error: any) {
        toast(error?.response?.data?.message ?? "Some thing went wrong");
      }
    } else {
      try {
        const { data: res } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASEURL}/subscription/create-checkout-session`,
          {
            price_id: isAnnual ? data.stripe_product_annual_id : data.stripe_product_id,
            plan_id: data.id,
            success_url: "http://localhost:3000/plan",
            cancel_url: "http://localhost:3000/plan",
          },
          {
            headers: {
              Authorization: `Bearer ${tokens?.accessToken}`,
            },
          }
        );
        const redirectUrl = res?.session?.url;
        if (redirectUrl) {
          window.location?.replace(`${redirectUrl}`);
        }
      } catch (error: any) {
        toast(error?.response?.data?.message ?? "Some thing went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <div className={`rounded-md w-full px-4 pt-4 pb-10 mb-2 max-w-xs bg-white relative text-black`}>
      <p className="flex items-center justify-center mt-1 mb-3 text-lg font-medium">
        {data.name !== "Basic" && (data.name === "Advanced" ? <Lightning1 /> : <Lightning2 />)}
        <span className={data.name !== "Basic" ? "ml-2" : ""}>{data.name}</span>
      </p>
      {data.name === "Ultimate" && (
        <span className="absolute top-1 right-2">
          <Ultimate />
        </span>
      )}
      {data.name !== "Basic" && (
        <div>
          <div className="flex items-center justify-center pl-6 mt-8 text-3xl font-medium">
            ${isAnnual ? data.price * 10 : data.price}
            <hr className={`w-0.5 h-6 mx-6 ${data.name === "Ultimate" ? "bg-black" : "bg-white"}`} />
            <span className="text-xl font-normal">{isAnnual ? "Year" : "Month"}</span>
          </div>
          {user && (
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 p-3 my-10 text-white rounded-md ${
                user.current_plan_id === data.id ? "bg-red-400" : "bg-purple"
              }`}
              onClick={handlePay}
            >
              {user.current_plan_id === data.id ? "Cancel Plan" : "Pay now"}
              {loading && <ScaleLoader color="#A5D7E8" loading={loading} width={2} height={16} />}
            </button>
          )}
        </div>
      )}
      <div className="flex pt-4 mt-5">
        <StarSvg className="flex-none" />
        <p className="ml-3">
          {data.name === "Basic" && "Free Plan"}
          {data.name === "Advanced" && "Ideal for medium-sized businesses"}
          {data.name === "Ultimate" && "Ideal for large businesses"}
        </p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.pages} pages/PDF</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.mega} MB/PDF</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.pdf} PDFs/day</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.question} questions/day</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.users} user</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.size} MB storage</p>
      </div>
      <div className="flex pt-4">
        <StarSvg className="flex-none" />
        <p className="ml-3">{data.connector} connectors</p>
      </div>
    </div>
  );
};

export default PlanCardDetail;
