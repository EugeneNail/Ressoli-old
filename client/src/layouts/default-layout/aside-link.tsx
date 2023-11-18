import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type AsideLinkProps = {
  text: string;
  route: string;
  icon: IconDefinition;
};

function AsideLink({ text, route, icon }: AsideLinkProps) {
  return (
    <NavLink to={route} className="aside-link">
      <FontAwesomeIcon className="aside-link__icon" icon={icon} />
      <p className="aside-link__text">{text}</p>
    </NavLink>
  );
}

export default AsideLink;
