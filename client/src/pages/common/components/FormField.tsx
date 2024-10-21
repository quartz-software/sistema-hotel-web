import "./FormField.css";
import { FC, ReactElement, useState } from "react";
import Input from "./Input";

type Props = { label: string; children: ReactElement<typeof Input> };

const FormField: FC<Props> = ({ label, children }) => {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {children}
      <p className="form-field__message"></p>
    </div>
  );
};
export default FormField;
