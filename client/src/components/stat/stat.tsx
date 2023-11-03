import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type StatProps = {
  icon: IconDefinition;
  value?: string;
};

const Stat: FC<StatProps> = (props) => {
  return (
    <div className="stat">
      <div className="stat__icon-container">
        <FontAwesomeIcon className="stat__icon" icon={props.icon} />
      </div>
      {props.value && <p className="stat__value">{props.value}</p>}
    </div>
  );
};

export default Stat;
