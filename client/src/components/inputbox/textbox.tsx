import { ChangeEvent, useState, useRef } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface TextboxProps {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  icon?: IconDefinition;
  errors?: string[];
  clearErrors?: (name: string) => void;
}

function Textbox({ value, label, onChange, name, icon: leadingIcon, errors, clearErrors }: TextboxProps) {
  const [isActive, setActive] = useState(value.length > 0);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleBlur() {
    if (value.length === 0) {
      setActive(false);
    }
    clearErrors?.(name);
  }

  return (
    <div className="inputbox">
      <div className="inputbox__body">
        {leadingIcon && <FontAwesomeIcon icon={leadingIcon} className="inputbox__leading-icon" />}
        <div className="inputbox__main">
          <label htmlFor={name} className={`inputbox__label ${isActive && "inputbox__label_active"}`}>
            {label}
          </label>
          <input
            onInput={() => setActive(true)}
            value={value}
            id={name}
            onChange={onChange}
            ref={inputRef}
            name={name}
            onBlur={handleBlur}
            onFocus={() => setActive(true)}
            type="text"
            className="inputbox__input"
          />
        </div>
      </div>
      {errors && errors?.length > 0 && (
        <ul className="inputbox__errors">
          {errors.map((error, index) => (
            <li key={index} className="inputbox__error">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Textbox;
