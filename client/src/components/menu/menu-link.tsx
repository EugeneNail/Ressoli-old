import { NavLink } from "react-router-dom";
import "./menu.sass";
import { Icon } from "../icon/icon";

type MenuLinkProps = {
  icon: string;
  text: string;
  to: string;
};

export function MenuLink({ icon, text, to }: MenuLinkProps) {
  return (
    <NavLink className="menu-link" to={to}>
      <Icon className="menu-link__icon" name={icon} />
      <p className="menu-link__text">{text}</p>
    </NavLink>
  );
}
