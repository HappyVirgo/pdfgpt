import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import MasterCardIcon from "../../../src/assets/svg/masterCardIcon.svg";
import Navbar from "../../components/ui/Navbar";
import PlanCard from "../../components/ui/PlanCard";
import { AuthContext } from "../AuthContextProvider";

const UserLayout: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");

  const [isPaymentMethod, setIsPaymentMethod] = useState(false);
  const [cardNumber, setCardNumber] = useState<string | undefined>("");
  const [inputCardNumber, setInputCardNumber] = useState<string | undefined>("");
  const [cardExpiry, setCardExpiry] = useState<string | undefined>("");
  const [inputCardExpiry, setInputCardExpiry] = useState<string | undefined>("");
  const [cvc, setCvc] = useState<string | undefined>();

  const [profileEditable, setProfileEditable] = useState(false);
  const [cardEditable, setCardEditable] = useState(false);

  useEffect(() => {
    if (user) {
      const [first, last] = user?.name?.split(" ");
      setFirstName(first);
      setLastName(last);
    }
  }, [user]);

  const formattedCardNumber = (value: string) => {
    const maskingSymbol = "•";

    const lastFourDigits = value.slice(-4);
    const maskedString = value.slice(0, -4).replace(/\d/g, maskingSymbol);
    const formattedString = `${maskedString}${lastFourDigits}`;

    return formattedString.replace(/(\u2022{4})/g, "$1 ");
  };

  const formatCardNumber = (value: string) => {
    const currentValue = value.replace(/[^\d]/g, "");
    if (currentValue.length > 16) return;
    setInputCardNumber(currentValue.replace(/(\d{4})/g, "$1 ").replace(/[^\d]+$/g, ""));
  };

  const formatExpiry = (value: string) => {
    const currentValue = value.replace(/[^\d]/g, "");
    if (currentValue.length > 4) {
      return;
    }
    setInputCardExpiry(currentValue.replace(/(\d{2})/g, "$1 / ").replace(/[^\d]+$/g, ""));
  };

  const formatCvc = (value: string) => {
    if (value.length > 3) return;
    setCvc(value);
  };

  async function getCustomerInfo() {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      if (token) {
        const { data } = await axios.post("api/stripe/get-customer-info", { token: token });
        const [first, last] = data?.user?.name?.split(" ");
        setFirstName(first);
        setLastName(last);
        if (data?.payment_methods) {
          setIsPaymentMethod(true);
          setCardNumber(data?.payment_methods?.data[0].card.last4.padStart(16, "•"));
          setCardExpiry(
            data?.payment_methods?.data[0].card.exp_month +
              " / " +
              data?.payment_methods?.data[0].card.exp_year.toString().slice(-2)
          );
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const savePersonalInfo = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const newData = {
        name: firstName + " " + lastName,
      };
      const { data } = await axios.post("api/profile", { userId: user?.id, accessToken: token, newData: newData });
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
    setProfileEditable(false);
  };

  const saveCardInfo = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const newData = {
        number: inputCardNumber?.replace(/\s/g, ""),
        exp_month: inputCardExpiry?.split("/")[0].replace(/\s/g, ""),
        exp_year: "20" + inputCardExpiry?.split("/")[1].replace(/\s/g, ""),
        cvc: cvc,
      };
      const { data } = await axios.post("api/stripe/update-customer-info", {
        token: token,
        newData: newData,
      });
    } catch (error) {
      console.log(error);
    }
    setCardEditable(false);
  };

  return (
    <div className="w-full h-full md:flex">
      <div className="flex justify-center w-full h-full py-10 transition-all duration-300 shadow-lg dark:bg-bgRadialEnd bg-lightText dark:bg-gradient-radial xl:py-20">
        <div className="w-full max-w-[1180px] left-1/2 lg:mx-20 md:mx-15 sm:mx-10 mx-10 2xl:mt-0 xl:mt-0 md:mt-8 sm:mt-8 mt-8">
          <Navbar />
          <div className="grid grid-cols-12 gap-4 mt-16">
            <div className="col-span-12 lg:col-span-8 md:col-span-6 sm:col-span-12">
              <div className="flex items-center col-span-12 sm:col-span-12">
                <p className="mr-8 text-2xl">Personal Information</p>
                <Button icon={true} text="Edit" additionalClass="border" onClick={() => setProfileEditable(true)} />
              </div>
              <div className="grid grid-cols-12 col-span-12 gap-4 mt-9 sm:col-span-12">
                <div className="col-span-5">
                  <div className="flex flex-col">
                    <p>First name</p>
                    <Input
                      name="first_name"
                      value={firstName}
                      isEditable={profileEditable}
                      onChange={(e: any) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2"></div>
                <div className="col-span-5">
                  <div className="flex flex-col">
                    <p>Last name</p>
                    <Input
                      name="last_name"
                      value={lastName}
                      isEditable={profileEditable}
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {profileEditable && (
                <div className="flex justify-end col-span-12 gap-3 pt-8 sm:col-span-12">
                  <Button text="Save" additionalClass="border" onClick={() => savePersonalInfo()} />
                  <Button
                    text="Cancel"
                    additionalClass="border"
                    onClick={() => {
                      setProfileEditable(false);
                      setFirstName(user?.name?.split(" ")[0]);
                      setLastName(user?.name?.split(" ")[1]);
                    }}
                  />
                </div>
              )}
              <div className="sm:col-span-12">
                <div className="flex items-center mt-10">
                  <p className="mr-8 text-2xl">Your card</p>
                  <Button
                    text={isPaymentMethod ? "Edit" : "Add"}
                    icon
                    additionalClass="border"
                    onClick={() => {
                      setCardEditable(true);
                    }}
                  />
                </div>
                <div className="mt-8 lg:w-1/2 md:w-full">
                  {cardEditable ? (
                    <div>
                      <div>
                        <p>Card Number</p>
                        <Input
                          name="card_number"
                          value={inputCardNumber}
                          isEditable={cardEditable}
                          onChange={(e: any) => {
                            formatCardNumber(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="w-full">
                          <p>Expire Date</p>
                          <Input
                            name="card_expiry"
                            value={inputCardExpiry}
                            isEditable={cardEditable}
                            onChange={(e: any) => {
                              formatExpiry(e.target.value);
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <p>CVC</p>
                          <Input
                            name="cvc"
                            value={cvc}
                            isEditable={cardEditable}
                            onChange={(e: any) => {
                              formatCvc(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4 mt-8 mb-4">
                        <Button text="Save" additionalClass="border" onClick={() => saveCardInfo()} />
                        <Button
                          text="Cancel"
                          additionalClass="border"
                          onClick={() => {
                            setCardEditable(false);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    isPaymentMethod && (
                      <div className="p-6 text-base text-white rounded-md bg-purple bg-gradient-to-b from-indigo-500">
                        <p>YOUR NAME</p>
                        <div className="mt-10">{formattedCardNumber(cardNumber ?? "")}</div>
                        <div className="flex justify-between mt-3">
                          <p>{cardExpiry}</p>
                          <MasterCardIcon />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-12 mb-8 lg:col-span-4 md:col-span-6 sm:col-span-12">
              <PlanCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
