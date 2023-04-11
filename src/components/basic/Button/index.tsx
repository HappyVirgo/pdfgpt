import React from "react";
import EditSvg from "../../../assets/svg/right_arraw.svg";

type ButtonProps = {
  text?: string;
  icon?: boolean;
  additionalClass?: string;
  onClick?: VoidFunction;
};

const Button: React.FC<ButtonProps> = ({ text, icon, additionalClass, onClick }) => {
  return (
    <button
      className={`py-2 px-4 dark:bg-transparent bg-purple text-white flex justify-center items-center rounded-full ${
        additionalClass ? additionalClass : ""
      }`}
      onClick={onClick}
    >
      {text}
      {icon && <EditSvg />}
    </button>
  );
};

export default Button;
