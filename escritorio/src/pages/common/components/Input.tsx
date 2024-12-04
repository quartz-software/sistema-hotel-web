import { FC } from "react";
import "./Input.css";

type Props = {
  placeholder?: string;
  handleInput: Function;
  type:
  | "text"
  | "password"
  | "email"
  | "tel"
  | "number"
  | "file"
  | "date"
  | "time"
  | "checkbox"
  | "radio";
  resetMessage: Function;
  autocomplete?: "email" | "current-password" | "new-password";
  value: string | boolean | number | Date;
  min?: number;
  max?: number;
};

const Input: FC<Props> = ({
  placeholder,
  handleInput,
  type,
  resetMessage,
  autocomplete,
  value,
  min,
  max,
}) => {
  function handleResult(value: string | boolean) {
    resetMessage();
    handleInput(value);
  }
  return (
    <input
      autoComplete={autocomplete}
      className="input"
      onInput={(e) => {
        if (type === "checkbox" || type === "radio") return;
        const target = e.target as HTMLInputElement;
        const result = target.value;
        handleResult(result);
      }}
      type={type}
      checked={typeof value === "boolean" ? value : false}
      onChange={(e) => {
        if (type !== "checkbox" && type !== "radio") return;
        const target = e.target as HTMLInputElement;
        const result = target.checked;
        handleResult(result);
      }}
      placeholder={placeholder ? placeholder : ""}
      value={typeof value !== "string" ? "" : value}
      {...(type === "number" && min !== undefined ? { min: min } : {})}
      {...(type === "number" && max !== undefined ? { max: max } : {})}
    />
  );
};

export default Input;
