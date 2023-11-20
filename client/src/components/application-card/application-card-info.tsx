import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./application-card.sass";
import classNames from "classnames";

type ApplicationCardInfoProps = {
  icon: IconDefinition;
  unit?: string;
  value?: string;
  bold?: boolean;
};

function ApplicationCardInfo({ icon, value, unit, bold }: ApplicationCardInfoProps) {
  return (
    <div className="application-card-info">
      <div className="application-card-info__icon-container">
        <FontAwesomeIcon icon={icon} className="application-card-info__icon" />
      </div>
      {value != null && (
        <p className="application-card-info__text">
          <span className={classNames("application-card-info__value", { "application-card-info__value_bold": bold })}>
            {value}
          </span>
          {unit && <span className="application-card-info__unit">{" " + unit}</span>}
        </p>
      )}
    </div>
  );
}

export default ApplicationCardInfo;
