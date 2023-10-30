import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type AsideLinkProps = {
  text: string;
  route: string;
  icon: IconDefinition;
};

const AsideLink: FC<AsideLinkProps> = (props) => {
  return (
    <NavLink to={props.route} className="aside-link">
      <FontAwesomeIcon className="aside-link__icon" icon={props.icon} />
      <p className="aside-link__text">{props.text}</p>
    </NavLink>
  );
};

export default AsideLink;
