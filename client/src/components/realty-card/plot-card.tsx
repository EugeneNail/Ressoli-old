import {
  faBolt,
  faDroplet,
  faExpand,
  faFireFlameCurved,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import Info from "../info/info";
import Stat from "../stat/stat";

type PlotCardProps = {
  plot: any;
};

const PlotCard: FC<PlotCardProps> = ({ plot }) => {
  return (
    <li className="realty-card">
      <img src={"/img/plot.jpg"} className="realty-card__photo" />
      <div className="realty-card__main-group">
        <p className="realty-card__title">Квартира в аренду</p>
        <p className="realty-card__price">
          <span className="realty-card__price-value">1 420 000 Р</span>
          <span className="realty-card__price-type">/месяц</span>
        </p>
      </div>
      <div className="realty-card__info-group">
        <Info icon={faLocationDot} value=" ул. Добролюбова, 3А, Батайск" />
        <Info icon={faUser} value="Алексей Петрушенко" />
        <Info icon={faPhone} value="8 (800) 555-35-35" fontSize={12} />
      </div>
      <div className="realty-card__stats-group">
        <Stat icon={faFireFlameCurved} />
        <Stat icon={faDroplet} />
        <Stat icon={faBolt} />
        <Stat icon={faExpand} value={"422.24 квм"} />
      </div>
    </li>
  );
};

export default PlotCard;
