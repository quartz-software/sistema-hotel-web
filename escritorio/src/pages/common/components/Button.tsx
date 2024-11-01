import { FC, MouseEventHandler, ReactNode } from "react";

import "./Button.css";
type Props = {
  children: ReactNode;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const Button: FC<Props> = ({ children, handleClick, disabled }) => {
  return (
    <button
      className="btn"
      onClick={(e) => {
        if (!disabled) handleClick(e);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
