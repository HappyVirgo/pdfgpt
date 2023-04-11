import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import MasterCardIcon from "../../../src/assets/svg/masterCardIcon.svg";
import Navbar from "../../components/ui/Navbar";
import PlanCard from "../../components/ui/PlanCard";
import { AuthContext } from "../AuthContextProvider";

const UserLayout: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [cardNumber, setCardNumber] = useState<string | undefined>("");
  const [cardExpiry, setCardExpiry] = useState<string | undefined>("");
  const [cvv, setCvv] = useState<string | undefined>();

  const [profileEditable, setProfileEditable] = useState(false);
  const [cardEditable, setCardEditable] = useState(false);

  useEffect(() => {
    if (user) {
      const [first, last] = user?.name?.split(" ");
      setFirstName(first);
      setLastName(last);
      setCardNumber("1234 5678 1234 5678");
      setCardExpiry("02/25");
      setCvv("650");
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
    setCardNumber(currentValue.replace(/(\d{4})/g, "$1 ").replace(/[^\d]+$/g, ""));
  };

  const formatExpiry = (value: string) => {
    const currentValue = value.replace(/[^\d]/g, "");
    if (currentValue.length > 4) {
      return;
    }
    setCardExpiry(currentValue.replace(/(\d{2})/g, "$1 / ").replace(/[^\d]+$/g, ""));
  };

  const formatCvv = (value: string) => {
    if (value.length > 3) return;
    setCvv(value);
  };

  const savePersonalInfo = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const data = {
        user_id: user?.id,
        firstName: firstName,
        lastName: lastName,
      };
      console.log("data: ", data);
      await axios.post("api/profile", { accessToken: token, data: data });
    } catch (error) {
      console.log(error);
    }
    setProfileEditable(false);
  };

  const saveCardInfo = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const data = {
        user_id: user?.id,
        cardNumber: cardNumber,
        cardExpiry: cardExpiry,
        cvv: cvv,
      };
      await axios.post("api/card", { accessToken: token, data: data });
    } catch (error) {
      console.log(error);
    }
    setCardEditable(false);
  };

  return (
    <div className="w-full h-full md:flex">
      <div className="w-full h-full flex justify-center dark:bg-bgRadialEnd  bg-lightText dark:bg-gradient-radial duration-300 transition-all py-10 shadow-lg xl:py-20">
        <div className="w-full max-w-[1180px] left-1/2 lg:mx-20 md:mx-15 sm:mx-10 mx-10 2xl:mt-0 xl:mt-0 md:mt-8 sm:mt-8 mt-8">
          <Navbar />
          <div className="grid grid-cols-12 gap-4 mt-16">
            <div className="lg:col-span-8 md:col-span-6 sm:col-span-12 col-span-12">
              <div className="flex items-center sm:col-span-12 col-span-12">
                <p className="text-white text-2xl mr-8">Personal Information</p>
                <Button editType="edit" text="Edit" additionalClass="border" onClick={() => setProfileEditable(true)} />
              </div>
              <div className="grid grid-cols-12 gap-4 mt-9 sm:col-span-12 col-span-12">
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
                <div className="flex pt-8 justify-end gap-3 sm:col-span-12 col-span-12">
                  <Button editType="save" text="Save" additionalClass="border" onClick={() => savePersonalInfo()} />
                  <Button
                    editType="cancel"
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
                  <p className="text-white text-2xl mr-8">Your card</p>
                  <Button
                    text="Edit"
                    editType="edit"
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
                          value={cardNumber}
                          isEditable={cardEditable}
                          onChange={(e: any) => {
                            formatCardNumber(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex mt-4 gap-4">
                        <div className="w-full">
                          <p>Expire Date</p>
                          <Input
                            name="card_expiry"
                            value={cardExpiry}
                            isEditable={cardEditable}
                            onChange={(e: any) => {
                              formatExpiry(e.target.value);
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <p>CVV</p>
                          <Input
                            name="cvv"
                            value={cvv}
                            isEditable={cardEditable}
                            onChange={(e: any) => {
                              formatCvv(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex mt-8 mb-4 justify-end gap-4">
                        <Button editType="save" text="Save" additionalClass="border" onClick={() => saveCardInfo()} />
                        <Button
                          editType="cancel"
                          text="Cancel"
                          additionalClass="border"
                          onClick={() => {
                            setCardEditable(false);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-purple bg-gradient-to-b from-indigo-500 rounded-md p-6 text-white text-base">
                      <p>YOUR NAME</p>
                      <div className="mt-10">{formattedCardNumber(cardNumber ?? "")}</div>
                      <div className="mt-3 flex justify-between">
                        <p>{cardExpiry}</p>
                        <MasterCardIcon />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 mb-8">
              <PlanCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
