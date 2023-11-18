import "./button.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  text?: string;
  style: "filled" | "dotted";
  iconOnly?: boolean;
  wide?: boolean;
  leadingIcon?: IconDefinition;
  trailingIcon?: IconDefinition;
  action: () => void;
  className?: string;
};

function Button({ text, style, iconOnly, wide, leadingIcon, trailingIcon, action, className }: ButtonProps) {
  const classList = ["button", "button_" + style];
  if (iconOnly) classList.push("button_icon-only");
  if (wide) classList.push("button_wide");
  if (className) classList.push(className);

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    action();
  }

  return (
    <button onClick={handleClick} className={classList.join(" ")}>
      {leadingIcon && <FontAwesomeIcon className="button__leading-icon" icon={leadingIcon} />}
      {!iconOnly && text}
      {!iconOnly && trailingIcon && <FontAwesomeIcon className="button__trailing-icon" icon={trailingIcon} />}
    </button>
  );
}

export default Button;
