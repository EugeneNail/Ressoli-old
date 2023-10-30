import { FC } from "react";
import "./button.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";

type ButtonProps = {
  text?: string;
  type: "regular" | "light";
  iconOnly?: boolean;
  wide?: boolean;
  leadingIcon?: IconDefinition;
  trailingIcon?: IconDefinition;
  action: () => void;
};

const Button: FC<ButtonProps> = (props) => {
  let style = "button" + " button_" + props.type;
  if (props.iconOnly) style += " button_icon-only";
  if (props.wide) style += " button_wide";

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    props.action();
  };

  return (
    <button onClick={handleClick} className={style}>
      {props.leadingIcon && <FontAwesomeIcon className="button__leading-icon" icon={props.leadingIcon} />}
      {!props.iconOnly && props.text}
      {!props.iconOnly && props.trailingIcon && (
        <FontAwesomeIcon className="button__trailing-icon" icon={props.trailingIcon} />
      )}
    </button>
  );
};

export default Button;
