import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./application-card.sass";

type ApplicationInfoProps = {
  icon: IconDefinition;
  unit?: string;
  value?: string;
  bold?: boolean;
};

function ApplicationInfo({ icon, value, unit, bold }: ApplicationInfoProps) {
  return (
    <div className="application-info">
      <div className="application-info__icon-container">
        <FontAwesomeIcon icon={icon} className="application-info__icon" />
      </div>
      {value != null && (
        <p className="application-info__text">
          <span className={"application-info__value" + (bold ? " application-info__value_bold" : "")}>{value}</span>
          {unit && <span className="application-info__unit">{" " + unit}</span>}
        </p>
      )}
    </div>
  );
}

export default ApplicationInfo;
