import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type InfoProps = {
  icon: IconDefinition;
  value: string;
  fontSize?: number;
};

const Info: FC<InfoProps> = (props) => {
  return (
    <div className="info">
      <div className="info__icon-container">
        <FontAwesomeIcon fontSize={props.fontSize} className="info__icon" icon={props.icon} />
      </div>
      <p className="info__value">{props.value}</p>
    </div>
  );
};

export default Info;
