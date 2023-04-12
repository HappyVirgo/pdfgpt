import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import MasterCardIcon from "../../../src/assets/svg/masterCardIcon.svg";
import Navbar from "../../components/ui/Navbar";
import PlanCard from "../../components/ui/PlanCard";
import { AuthContext } from "../AuthContextProvider";

const planDescription = ["Free plan", "Ideal for medium-sized businesses", "Ideal for large businesses"];

const UserLayout: React.FC = () => {
  const { push } = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");

  const [isPaymentMethod, setIsPaymentMethod] = useState(false);
  const [cardInfo, setCardInfo] = useState<{ number: string; expiry: string }>({ number: "", expiry: "" });
  const [cardNumber, setCardNumber] = useState<string | undefined>("");
  const [cardExpiry, setCardExpiry] = useState<string | undefined>("");
  const [cvc, setCvc] = useState<string | undefined>();

  const [profileEditable, setProfileEditable] = useState(false);
  const [cardEditable, setCardEditable] = useState(false);

  const [plan, setPlan] = useState<undefined | { [key: string]: any }>();

  const formatCardNumber = (value: string) => {
    const currentValue = value.replace(/[^\d]/g, "");
    if (currentValue.length > 16) return;
    setCardNumber(currentValue.replace(/(\d{4})/g, "$1 ").replace(/[^\d]+$/g, ""));
    setCardInfo((prev) => ({ ...prev, number: currentValue.replace(/(\d{4})/g, "$1 ").replace(/[^\d]+$/g, "") }));
  };

  const formatExpiry = (value: string) => {
    const currentValue = value.replace(/[^\d]/g, "");
    if (currentValue.length > 4) {
      return;
    }
    setCardExpiry(currentValue.replace(/(\d{2})/g, "$1 / ").replace(/[^\d]+$/g, ""));
    setCardInfo((prev) => ({ ...prev, expiry: currentValue.replace(/(\d{2})/g, "$1 / ").replace(/[^\d]+$/g, "") }));
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
        console.log("data: ", data);
        const [first, last] = data?.user?.name?.split(" ");
        setPlan(data.plan);
        setFirstName(first);
        setLastName(last);
        if (data?.payment_methods) {
          setIsPaymentMethod(true);
          setCardInfo({
            number: data?.payment_methods?.data[0].card.last4.padStart(16, "•"),
            expiry:
              data?.payment_methods?.data[0].card.exp_month +
              " / " +
              data?.payment_methods?.data[0].card.exp_year.toString().slice(-2),
          });
        }
      }
    } catch (error: any) {
      push("/");
    }
  }

  useEffect(() => {
    if (!user) {
      push("/");
    }
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
      if (isPaymentMethod) {
        const data = {
          exp_month: cardExpiry?.split("/")[0].replace(/\s/g, ""),
          exp_year: "20" + cardExpiry?.split("/")[1].replace(/\s/g, ""),
        };
        await axios.post("api/stripe/update-customer-info", {
          token: token,
          data,
        });
      } else {
        const data = {
          number: cardNumber?.replace(/\s/g, ""),
          exp_month: cardExpiry?.split("/")[0].replace(/\s/g, ""),
          exp_year: "20" + cardExpiry?.split("/")[1].replace(/\s/g, ""),
          cvc: cvc,
        };
        await axios.post("api/stripe/create-customer", {
          token: token,
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setCardEditable(false);
  };

  return (
    <div className="w-full h-full md:flex">
      <div className="flex justify-center w-full h-full py-10 overflow-auto transition-all duration-300 shadow-lg dark:bg-bgRadialEnd bg-lightText dark:bg-gradient-radial xl:py-20">
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
                  {isPaymentMethod && (
                    <Button
                      text="Remove"
                      icon
                      additionalClass="border ml-3"
                      onClick={() => {
                        setCardEditable(true);
                      }}
                    />
                  )}
                </div>
                <div className="mt-8 lg:w-1/2 md:w-full">
                  {cardEditable ? (
                    <div>
                      {!isPaymentMethod && (
                        <div>
                          <p>Card Number</p>
                          <Input
                            name="card_number"
                            value={cardNumber}
                            disabled={isPaymentMethod}
                            isEditable={cardEditable}
                            onChange={(e: any) => {
                              formatCardNumber(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      <div className="flex gap-4 mt-4">
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
                        {!isPaymentMethod && (
                          <div className="w-full">
                            <p>CVC</p>
                            <Input
                              name="cvc"
                              disabled={isPaymentMethod}
                              value={cvc}
                              isEditable={cardEditable}
                              onChange={(e: any) => {
                                formatCvc(e.target.value);
                              }}
                            />
                          </div>
                        )}
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
                        <div className="mt-10">{cardInfo.number}</div>
                        <div className="flex justify-between mt-3">
                          <p>{cardInfo.expiry}</p>
                          <MasterCardIcon />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-12 mb-8 lg:col-span-4 md:col-span-6 sm:col-span-12">
              {!!plan && (
                <PlanCard
                  title={`${plan.name}`}
                  description={planDescription[plan.id]}
                  pages={plan.pages}
                  pdf={plan.pdf}
                  query={plan.query}
                  size={plan.size}
                  users={plan.user}
                  price={plan.price}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
