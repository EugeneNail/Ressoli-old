import { ChangeEvent, KeyboardEvent, FC, useState, useRef } from "react";
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

const Numberbox: FC<NumberboxProps> = (props) => {
  const [isActive, setActive] = useState(props.value != 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef(0);
  const timeoutRef = useRef(0);

  const handleBlur = () => {
    if (props.value.toString().length === 0 || inputRef.current?.value.length === 0) {
      setActive(false);
    }
    props.clearErrors?.(props.name);
  };

  const changeByStep = (vector: 1 | -1) => {
    const input = inputRef.current;
    if (input == null) {
      return;
    }
    const previousValue = input.value.length > 0 ? parseFloat(input.value) : 0;
    let calculatedValue = previousValue + vector * props.step;
    if (props.min != null && calculatedValue < props.min) {
      calculatedValue = props.min;
    }
    if (props.max != null && calculatedValue > props.max) {
      calculatedValue = props.max;
    }
    input.value = calculatedValue.toFixed(props.precision).toString();
    (input as any)._valueTracker.setValue(previousValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const repeatedlyChangeByStep = (vector: 1 | -1) => {
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
  };

  const stopRepeating = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.min != null && parseFloat(event.target.value) < props.min) {
      event.target.value = props.min.toString();
    }
    if (props.max != null && parseFloat(event.target.value) > props.max) {
      event.target.value = props.max.toString();
    }
    props.onChange(event);
  };

  const filterInput = (event: KeyboardEvent<HTMLInputElement>) => {
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
            value={props.value == 0 ? "" : props.value}
            onInput={() => setActive(true)}
            id={props.name}
            onChange={handleChange}
            ref={inputRef}
            name={props.name}
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

export default Numberbox;
