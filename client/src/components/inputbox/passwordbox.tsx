import { FC, ChangeEvent, FocusEvent, useState, useRef } from "react";
import "./inputbox.sass";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PasswordboxProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  leadingIcon?: IconDefinition;
  errors?: string[];
  clearErrors?: (name: string) => void;
}

const Passwordbox: FC<PasswordboxProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setActive(false);
    }
    props.clearErrors?.(props.name);
  };

  return (
    <div className="inputbox">
      <div className="inputbox__outer-wrapper">
        {props.leadingIcon && <FontAwesomeIcon icon={props.leadingIcon} className="inputbox__leading-icon" />}
        <div className="inputbox__inner-wrapper">
          <label htmlFor={props.name} className={"inputbox__label" + (isActive ? " inputbox__label_active" : "")}>
            {props.label}
          </label>
          <input
            id={props.name}
            onChange={props.onChange}
            ref={inputRef}
            name={props.name}
            onBlur={handleBlur}
            onFocus={() => setActive(true)}
            type={isVisible ? "text" : "password"}
            className="inputbox__input"
          />
        </div>
        <FontAwesomeIcon
          icon={isVisible ? faEyeSlash : faEye}
          className="inputbox__trailing-icon"
          onClick={() => setVisible(!isVisible)}
        />
      </div>

      <p className="inputbox__hint">{props.hint}</p>
      {props.errors && props.errors?.length > 0 && (
        <ul className="inputbox__errors">
          {props.errors.map((error, index) => (
            <li key={index} className="inputbox__error">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Passwordbox;
