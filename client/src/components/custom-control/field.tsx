import classNames from "classnames";
import "./custom-control.sass";
import { useState, FocusEvent, useEffect } from "react";
import { ControlProps } from "../../model/control-props";
import { HelperText } from "./helper-text";
import { Icon } from "../icon/icon";

type FieldProps = ControlProps & {
  password?: boolean;
};

export function Field({ name, label, value = "", icon, helperText = "", password, errors, resetError }: FieldProps) {
  const [isActive, setActive] = useState(value.length > 0);
  const [isVisible, setVisible] = useState(false);
  const [isInvalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(errors.length > 0);
  }, [errors]);

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setActive(event.target.value.length > 0);
    resetError?.(name);
  }

  return (
    <div className={classNames("control", { invalid: isInvalid }, { active: isActive })}>
      <label htmlFor={name} className="control__main-area">
        <div className="control__icon-container">
          <Icon className="control__icon" name={icon} />
        </div>
        <p className="control__label">{label}</p>
        <input
          autoComplete="on"
          type={password && !isVisible ? "password" : "text"}
          className={"control__input"}
          name={name}
          id={name}
          defaultValue={value}
          onInput={() => setActive(true)}
          onFocus={() => setActive(true)}
          onBlur={handleBlur}
        />
        {password && (
          <>
            <div className="control__button control__icon-container" onClick={() => setVisible(!isVisible)}>
              <Icon className="control__icon" name={isVisible ? "visibility_off" : "visibility"} />
            </div>
          </>
        )}
      </label>
      <HelperText errors={errors} text={helperText} />
    </div>
  );
}
