import { ChangeEvent } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type CheckboxProps = {
  value: boolean;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  clearErrors?: (name: string) => void;
};

function Checkbox({ value, name, label, onChange }: CheckboxProps) {
  return (
    <label htmlFor={name} className="checkbox">
      <FontAwesomeIcon className="checkbox__icon" icon={faCheck} />
      <input id={name} checked={value} name={name} type="checkbox" className="checkbox__input" onChange={onChange} />
      <p className={classNames("checkbox__text", { checkbox__text_checked: value })}>{label}</p>
    </label>
  );
}

export default Checkbox;
