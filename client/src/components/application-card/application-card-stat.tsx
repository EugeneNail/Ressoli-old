import { Icon } from "../icon/icon";
import "./application-card.sass";

type ApplicationCardStatProps = {
  icon: string;
  value?: string | number;
};

export function ApplicationCardStat({ icon, value }: ApplicationCardStatProps) {
  return (
    <div className="application-card-stat">
      <Icon className="application-card-stat__icon" name={icon} />
      {value && <p className="application-card-stat__value">{value}</p>}
    </div>
  );
}
