import React, { useContext } from "react";

import { AuthContext } from "../../../layout/AuthContextProvider";
import Button from "../../basic/Button";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-100 relative flex justify-between items-center bg-bgRadialStart rounded-md p-2.5">
      <img
        src={user?.picture}
        width={65}
        height={65}
        className="rounded-full absolute lg:-left-3.5 -left-2"
        alt="avatar"
      />
      <div className="flex items-center justify-between w-full">
        <div className="lg:w-4/12 w-1/2">
          <p className="text-white xl:text-xl md:text-xl sm:text-base text-base lg:text-left md:text-left sm:text-left text-center xl:pl-20 lg:pl-14 md:pl-14 sm:pl-14 pl-12">
            {user?.name}
          </p>
        </div>
        <div className="text-right lg:w-8/12 sm:w-1/2 w-1/2 lg:pr-7 pr-3">
          <span className="text-white lg:text-2xl sm:text-center text-xl font-medium">Plan Basic</span>
        </div>
        <div className="lg:pr-6 pr-0">
          <Button text="Edit" additionalClass="bg-purple" editType="edit" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
