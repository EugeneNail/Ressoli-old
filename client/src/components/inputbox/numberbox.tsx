import { ChangeEvent, KeyboardEvent, useState, useRef } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface NumberboxProps {
  value: number;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  leadingIcon?: IconDefinition;
  errors?: string[];
  clearErrors?: (name: string) => void;
  step: number;
  min?: number;
  max?: number;
  precision?: number;
}

function Numberbox({
  value,
  label,
  onChange,
  name,
  leadingIcon,
  errors,
  clearErrors,
  step,
  min,
  max,
  precision,
  hint,
}: NumberboxProps) {
  const [isActive, setActive] = useState(value != 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef(0);
  const timeoutRef = useRef(0);

  function handleBlur() {
    if (value.toString().length === 0 || inputRef.current?.value.length === 0) {
      setActive(false);
    }
    clearErrors?.(name);
  }

  function changeByStep(vector: 1 | -1) {
    const input = inputRef.current;
    if (input == null) {
      return;
    }
    const previousValue = input.value.length > 0 ? parseFloat(input.value) : 0;
    let calculatedValue = previousValue + vector * step;
    if (min != null && calculatedValue < min) {
      calculatedValue = min;
    }
    if (max != null && calculatedValue > max) {
      calculatedValue = max;
    }
    input.value = calculatedValue.toFixed(precision).toString();
    (input as any)._valueTracker.setValue(previousValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function repeatedlyChangeByStep(vector: 1 | -1) {
    setActive(true);
    intervalRef.current = setInterval(() => {
      changeByStep(vector);
    }, 200);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        changeByStep(vector);
      }, 50);

      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
          changeByStep(vector);
        }, 10);
      }, 2000);
    }, 2000);
  }

  function stopRepeating() {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (min != null && parseFloat(event.target.value) < min) {
      event.target.value = min.toString();
    }
    if (max != null && parseFloat(event.target.value) > max) {
      event.target.value = max.toString();
    }
    onChange(event);
  }

  function filterInput(event: KeyboardEvent<HTMLInputElement>) {
    if (inputRef.current == null) {
      return;
    }
    if (event.key == "." || event.key == "e") {
      event.preventDefault();
      return;
    }
    const parts = inputRef.current.value.split(".");
    if (parts.length > 1 && parts[1].length == 2) {
      event.preventDefault();
      return;
    }
  }

  return (
    <div className="inputbox">
      <div className="inputbox__outer-wrapper">
        {leadingIcon && <FontAwesomeIcon icon={leadingIcon} className="inputbox__leading-icon" />}
        <div className="inputbox__inner-wrapper">
          <label htmlFor={name} className={"inputbox__label" + (isActive ? " inputbox__label_active" : "")}>
            {label}
          </label>
          <input
            value={value == 0 ? "" : value}
            onInput={() => setActive(true)}
            id={name}
            onChange={handleChange}
            ref={inputRef}
            name={name}
            onBlur={handleBlur}
            onFocus={() => setActive(true)}
            type="number"
            onKeyPress={filterInput}
            className="inputbox__input"
          />
        </div>
        <div className="inputbox__trailing-buttons">
          <FontAwesomeIcon
            fixedWidth
            className="inputbox__trailing-button"
            icon={faCaretUp}
            onClick={() => changeByStep(1)}
            onMouseDown={() => repeatedlyChangeByStep(1)}
            onMouseUp={stopRepeating}
          />
          <FontAwesomeIcon
            fixedWidth
            className="inputbox__trailing-button"
            icon={faCaretDown}
            onClick={() => changeByStep(-1)}
            onMouseDown={() => repeatedlyChangeByStep(-1)}
            onMouseUp={stopRepeating}
          />
        </div>
      </div>
      <p className="inputbox__hint">{hint}</p>
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

export default Numberbox;
