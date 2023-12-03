import "./button.sass";
import { MouseEvent } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

type ButtonProps = {
  text?: string;
  style: "filled" | "dotted";
  wide?: boolean;
  action?: () => void;
  className?: string;
  to?: string | number;
};

function Button({ text, style, wide, action, className, to }: ButtonProps) {
  const classList = classNames("button", "button_" + style, { button_wide: wide }, className);

  function handleClick() {
    action?.();
  }

  return (
    <>
      {to && (
        <Link className={classList} target="_blank" to={to.toString()}>
          {text}
        </Link>
      )}
      {!to && (
        <button onClick={handleClick} className={classList}>
          {text}
        </button>
      )}
    </>
  );
}

export default Button;
