import React, { ChangeEvent } from "react";

type InputProps = {
  name?: string;
  value?: string;
  disabled?: boolean;
  isEditable?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ name, value, isEditable = false, disabled = false, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      disabled={disabled}
      className={`w-full rounded-md py-2 bg-transparent outline-none ${
        !isEditable ? "border-none ring-0 px-0" : "border px-2 mt-2"
      }`}
      readOnly={!isEditable}
      onChange={onChange}
    />
  );
};

export default Input;
