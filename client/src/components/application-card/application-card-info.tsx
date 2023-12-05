import "./application-card.sass";

type ApplicationCardInfoProps = {
  value?: string | number;
  name: string;
};

export function ApplicationCardInfo({ value, name }: ApplicationCardInfoProps) {
  return (
    <div className="application-card-info">
      <p className="application-card-info__name">{name}</p>
      <p className="application-card-info__value">{value}</p>
    </div>
  );
}
