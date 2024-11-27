import { FC } from "react";
import "./Input.css";

type Props = {
  placeholder?: string;
  handleInput: Function;
  type: string;
  resetMessage: Function;
  autocomplete?: "email" | "current-password" | "new-password";
  value: string,
};

const Input: FC<Props> = ({
  placeholder,
  handleInput,
  type,
  resetMessage,
  autocomplete,
  value,
}) => {
  return (
    <input
      autoComplete={autocomplete ? autocomplete : ""}
      className="input"
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        const result = target.value.trim();
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
