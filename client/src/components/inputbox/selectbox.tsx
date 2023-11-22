import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";

type SelectBoxProps = {
  value: string;
  options?: string[];
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  icon?: IconDefinition;
  errors?: string[];
  clearErrors?: (name: string) => void;
};

function SelectBox({ value, options, label, onChange, name, icon: leadingIcon, errors, clearErrors }: SelectBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(value.length > 0);
  const [isListDisplayed, setListDisplayed] = useState(false);

  useEffect(() => {
    setActive(value.length > 0);
  }, [value]);

  function handleBlur() {
    if (value.length === 0) {
      setActive(false);
    }
    clearErrors?.(name);
    // Потеря фокуса срабатывает раньше регистрации клика по опции
    // работают значения >100 мс
    setTimeout(() => {
      setListDisplayed(false);
    }, 100);
  }

  function selectOption(value: string) {
    const input = inputRef.current;

    if (input == null) {
      return;
    }

    const previousValue = input.value;
    input.value = value;
    (input as any)._valueTracker.setValue(previousValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    setActive(true);
    setListDisplayed(false);
  }

  function handleFocus() {
    setActive(true);
    setListDisplayed(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="inputbox selectbox">
      <div className="inputbox__body">
        {leadingIcon && <FontAwesomeIcon icon={leadingIcon} className="inputbox__leading-icon" />}
        <div className="inputbox__main">
          <label htmlFor={name} className={classNames("inputbox__label", { inputbox__label_active: isActive })}>
            {label}
          </label>
          <input
            onInput={() => setActive(true)}
            value={value}
            readOnly={true}
            name={name}
            id={name}
            className="inputbox__input selectbox__input"
            onChange={onChange}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="inputbox__trailing-icon selectbox__trailing-icon"
          onClick={handleFocus}
        />
      </div>
      {options && options.length > 0 && (
        <ul className="inputbox__options" style={{ display: isListDisplayed ? "flex" : "none" }}>
          {options.map((option, index) => (
            <li key={index} className="inputbox__option" onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
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

export default SelectBox;
