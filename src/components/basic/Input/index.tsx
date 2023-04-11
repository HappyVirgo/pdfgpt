import React from "react";

type InputProps = {
  name?: string;
  value?: string;
  isEditable?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ name, value, isEditable = false, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      className={`rounded-md py-2 bg-transparent ${!isEditable ? "border-none px-0" : "border px-2 mt-2"}`}
      readOnly={!isEditable}
      onChange={() => onChange}
    />
  );
};

export default Input;
