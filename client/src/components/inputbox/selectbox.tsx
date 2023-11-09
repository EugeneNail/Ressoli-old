import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FC, useRef, useState, FocusEvent } from "react";

type SelectBoxProps = {
  options?: string[];
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  leadingIcon?: IconDefinition;
  errors?: string[];
  clearErrors?: (name: string) => void;
  readOnly?: boolean;
};

const SelectBox: FC<SelectBoxProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(false);
  const [isListDisplayed, setListDisplayed] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setActive(false);
    }
    props.clearErrors?.(props.name);
    // Потеря фокуса срабатывает раньше регистрации клика по опции
    // работают значения >100 мс
    setTimeout(() => {
      setListDisplayed(false);
    }, 100);
  };

  const selectOption = (value: string) => {
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
  };

  const handleFocus = () => {
    setActive(true);
    setListDisplayed(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="inputbox selectbox">
      <div className="inputbox__outer-wrapper">
        {props.leadingIcon && <FontAwesomeIcon icon={props.leadingIcon} className="inputbox__leading-icon" />}
        <div className="inputbox__inner-wrapper">
          <label htmlFor={props.name} className={"inputbox__label" + (isActive ? " inputbox__label_active" : "")}>
            {props.label}
          </label>
          <input
            readOnly={true}
            name={props.name}
            id={props.name}
            className="inputbox__input selectbox__input"
            onChange={props.onChange}
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
      {props.options && props.options.length > 0 && (
        <ul className="inputbox__options" style={{ display: isListDisplayed ? "flex" : "none" }}>
          {props.options.map((option, index) => (
            <li key={index} className="inputbox__option" onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
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

export default SelectBox;
