import { ChangeEvent } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type CheckboxProps = {
  value: boolean;
  name: string;
  label: string;
  icon: IconDefinition;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  clearErrors?: (name: string) => void;
};

function Checkbox({ value, name, label, icon, onChange }: CheckboxProps) {
  return (
    <label htmlFor={name} className="checkbox">
      <div className="checkbox__icon-container">
        <FontAwesomeIcon className="checkbox__icon" icon={icon} />
      </div>
      <FontAwesomeIcon className="checkbox__checkmark" icon={faCheck} />
      <input id={name} checked={value} name={name} type="checkbox" className="checkbox__input" onChange={onChange} />
      <p className={classNames("checkbox__text", { checkbox__text_checked: value })}>{label}</p>
    </label>
  );
}

export default Checkbox;
