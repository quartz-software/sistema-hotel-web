import { FC, useState } from "react";
import "./Input.css";

type Props = {
  placeholder?: string;
  handleInput: Function;
  type: string;
  onSuccess: Function;
  onError: Function;
};

const Input: FC<Props> = ({
  placeholder,
  handleInput,
  type,
  onError,
  onSuccess,
}) => {
  const [value, setValue] = useState("");
  return (
    <input
      className="input"
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        const result = target.value.trim();
        setValue(result);
        handleInput(result);
      }}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      value={value}
    />
  );
};

export default Input;
