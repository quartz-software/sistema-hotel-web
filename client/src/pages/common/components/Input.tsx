import { FC, useState } from "react";
import "./Input.css";

type Props = {
  placeholder?: string;
  handleInput: Function;
  type: string;
  resetMessage: Function;
  autocomplete: "email" | "current-password" | "new-password";
};

const Input: FC<Props> = ({
  placeholder,
  handleInput,
  type,
  resetMessage,
  autocomplete,
}) => {
  const [value, setValue] = useState("");
  return (
    <input
      autoComplete={autocomplete}
      className="input"
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        const result = target.value.trim();
        setValue(result);
        handleInput(result);
        resetMessage();
      }}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      value={value}
    />
  );
};

export default Input;
