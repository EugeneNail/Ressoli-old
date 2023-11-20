import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./application-info.sass";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ApplicationInfoProps = {
  label: string;
  value: string;
  icon: IconDefinition;
};

function ApplicationInfo({ label, value, icon }: ApplicationInfoProps) {
  return (
    <div className="application-info">
      <div className="application-info__icon-container">
        <FontAwesomeIcon className="application-info__icon" icon={icon} />
      </div>
      <h4 className="application-info__label">{label}</h4>
      <p className="application-info__value">{value}</p>
    </div>
  );
}

export default ApplicationInfo;
