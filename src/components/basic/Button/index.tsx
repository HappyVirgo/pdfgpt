import React from "react";
import EditSvg from "../../../assets/svg/right_arraw.svg";
import { ScaleLoader } from "react-spinners";

type ButtonProps = {
  text?: string;
  icon?: boolean;
  additionalClass?: string;
  loading?: boolean;
  onClick?: VoidFunction;
};

const Button: React.FC<ButtonProps> = ({ text, icon, additionalClass, onClick, loading }) => {
  return (
    <button
      className={`py-2 px-4 dark:bg-transparent bg-purple text-white flex justify-center items-center rounded-full ${
        additionalClass ? additionalClass : ""
      }`}
      onClick={onClick}
    >
      {text}
      {icon && <EditSvg />}
      {loading && <ScaleLoader color="#A5D7E8" loading={loading} width={2} height={16} />}
    </button>
  );
};

export default Button;
