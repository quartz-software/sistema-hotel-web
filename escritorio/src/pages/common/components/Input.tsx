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
  | "checkbox"
  | "radio";
  resetMessage: Function;
  autocomplete?: "email" | "current-password" | "new-password";
  value: string | boolean;
};

const Input: FC<Props> = ({
  placeholder,
  handleInput,
  type,
  resetMessage,
  autocomplete,
  value,
}) => {
  function handleResult(value: string | boolean | File) {
    resetMessage();
    handleInput(value);
  }
  return (
    <input
      autoComplete={autocomplete ? autocomplete : ""}
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
        if (type !== "checkbox" && type !== "radio" && type !== "file") return;
        if (type === "file" && e.target.files && e.target.files.length > 0) {
          handleResult(e.target.files.item(0)!)
          return
        }
        const target = e.target as HTMLInputElement;
        const result = target.checked;
        handleResult(result);
      }}
      placeholder={placeholder ? placeholder : ""}
      {...type !== "file" ? { value: typeof value !== "string" ? "" : value } : {}}
    />
  );
};

export default Input;
