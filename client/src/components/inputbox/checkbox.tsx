import { ChangeEvent, FC } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type CheckboxProps = {
  value: boolean;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  clearErrors?: (name: string) => void;
};

const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label htmlFor={props.name} className="checkbox">
      <FontAwesomeIcon className="checkbox__icon" icon={faCheck} />
      <input
        id={props.name}
        value={props.value.toString()}
        name={props.name}
        type="checkbox"
        className="checkbox__input"
        onChange={props.onChange}
      />
      <p className="checkbox__text">{props.label}</p>
    </label>
  );
};

export default Checkbox;
