import React from "react";
import EditSvg from "../../../assets/svg/right_arraw.svg";

type ButtonProps = {
  text?: string;
  editType?: "save" | "edit" | "cancel";
  additionalClass?: string;
  onClick?: VoidFunction;
};

const Button: React.FC<ButtonProps> = ({ text, editType, additionalClass, onClick }) => {
  return (
    <button
      className={`py-2 px-4 flex justify-center items-center text-white rounded-full ${
        additionalClass ? additionalClass : ""
      }`}
      onClick={onClick}
    >
      {text}
      {editType === "edit" && <EditSvg />}
    </button>
  );
};

export default Button;
