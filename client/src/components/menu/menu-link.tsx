import { NavLink } from "react-router-dom";
import "./menu.sass";

type MenuLinkProps = {
  icon: string;
  text: string;
  to: string;
};

export function MenuLink({ icon, text, to }: MenuLinkProps) {
  return (
    <NavLink className="menu-link" to={to}>
      <span className="material-symbols-rounded menu-link__icon">{icon}</span>
      <p className="menu-link__text">{text}</p>
    </NavLink>
  );
}
