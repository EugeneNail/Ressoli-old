import classNames from "classnames";
import { ControlProps } from "../../model/control-props";
import { useState, FocusEvent, useEffect } from "react";
import { HelperText } from "./helper-text";
import { Icon } from "../icon/icon";

type DropdownProps = ControlProps & {
  options: string[];
};

export function Dropdown({
  name,
  label,
  resetError,
  options,
  value = "",
  icon,
  helperText = "",
  errors,
}: DropdownProps) {
  const [isActive, setActive] = useState(value.length > 0);
  const [isInvalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(errors.length > 0);
  }, [errors]);

  function handleBlur(event: FocusEvent<HTMLSelectElement>) {
    setActive(event.target.value.length > 0);
    resetError?.(name);
  }

  function handleChange() {
    setActive(true);
    resetError?.(name);
  }

  return (
    <div className={classNames("control", { active: isActive }, { invalid: isInvalid })}>
      <label htmlFor={name} className="control__main-area dropdown">
        <div className="control__icon-container">
          <Icon className="control__icon" name={icon} />
        </div>
        <select
          onBlur={handleBlur}
          onInput={() => setActive(true)}
          onChange={handleChange}
          name={name}
          id={name}
          defaultValue={value}
          className="control__input"
        >
          <option value="" className="dropdown__option hidden" />
          {options.map((option, index) => (
            <option key={index} value={option} className="dropdown__option">
              {option}
            </option>
          ))}
        </select>
        <p className="control__label">{label}</p>
        <div className="control__button control__icon-container">
          <Icon className="control__icon dropdown__icon affected" name="expand_more" />
        </div>
      </label>
      <HelperText errors={errors} text={helperText} />
    </div>
  );
}
