import { ChangeEvent, FocusEvent, FC, useState, useRef } from "react";
import "./inputbox.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface TextboxProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  name: string;
  leadingIcon?: IconDefinition;
  trailingIcon?: IconDefinition;
}

const Textbox: FC<TextboxProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setActive(false);
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
            onChange={props.onChange}
            ref={inputRef}
            name={props.name}
            onBlur={handleBlur}
            onFocus={() => setActive(true)}
            type="text"
            className="inputbox__input"
          />
        </div>
        {props.trailingIcon && <FontAwesomeIcon icon={props.trailingIcon} className="inputbox__trailing-icon" />}
      </div>
      <p className="inputbox__hint">{props.hint}</p>
    </div>
  );
};

export default Textbox;
