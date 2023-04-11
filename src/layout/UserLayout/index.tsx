import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Button from "../../components/basic/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/basic/Input";
import Navbar from "../../components/ui/Navbar";
import PlanCard from "../../components/ui/PlanCard";
import { AuthContext } from "../AuthContextProvider";

const UserLayout: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (user) {
      const [first, last] = user?.name?.split(" ");
      setFirstName(first);
      setLastName(last);
    }
  }, [user]);

  const savePersonalInfo = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const data = {
        user_id: user?.id,
        firstName: firstName,
        lastName: lastName,
      };
      console.log("data: ", data);
      await axios.post("api/auth", { accessToken: token, data: data });
    } catch (error) {
      console.log(error);
    }
    setIsEditable(false);
  };

  return (
    <div className="w-full h-full md:flex">
      <div className="w-full h-full flex justify-center dark:bg-bgRadialEnd  bg-lightText dark:bg-gradient-radial duration-300 transition-all py-10 shadow-lg xl:py-20">
        <div className="w-full max-w-[1180px] left-1/2 lg:mx-20 md:mx-15 sm:mx-10 2xl:mt-0 xl:mt-0 md:mt-8 sm:mt-8 mt-8">
          <Navbar />
          <div className="grid grid-cols-12 gap-4 mt-16">
            <div className="lg:col-span-8 md:col-span-6 sm:col-span-12 col-span-12">
              <div className="flex items-center sm:col-span-12 col-span-12">
                <p className="text-white text-2xl mr-8">Personal Information</p>
                <Button editType="edit" text="Edit" additionalClass="border" onClick={() => setIsEditable(true)} />
              </div>
              <div className="grid grid-cols-12 gap-4 mt-9 sm:col-span-12 col-span-12">
                <div className="col-span-5">
                  <div className="flex flex-col">
                    <p>First name</p>
                    <Input
                      name="first_name"
                      value={firstName}
                      isEditable={isEditable}
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
                      isEditable={isEditable}
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {isEditable && (
                <div className="flex pt-8 justify-end gap-3 sm:col-span-12 col-span-12">
                  <Button editType="save" text="Save" additionalClass="border" onClick={() => savePersonalInfo()} />
                  <Button
                    editType="cancel"
                    text="Cancel"
                    additionalClass="border"
                    onClick={() => {
                      setIsEditable(false);
                      setFirstName(user?.name?.split(" ")[0]);
                      setLastName(user?.name?.split(" ")[1]);
                    }}
                  />
                </div>
              )}
              <div className="sm:col-span-12">
                <div className="flex items-center mt-10">
                  <p className="text-white text-2xl mr-8">Your card</p>
                  <Button text="Edit" editType="edit" additionalClass="border" />
                </div>
                <div className="mt-8 lg:w-1/2 md:w-full">
                  <Card />
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
