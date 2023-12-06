import { Icon } from "../../components/icon/icon";

type ApplicationPageInfoProps = {
  icon: string;
  value: string | number;
  tooltip?: string;
};

export function ApplicationPageInfo({ icon, value, tooltip }: ApplicationPageInfoProps) {
  return (
    <div className="application-page-info">
      {tooltip && <p className="application-page-info__tooltip">{tooltip}</p>}
      <Icon className="application-page-info__icon" name={icon} />
      <p className="application-page-info__value">{value}</p>
    </div>
  );
}
