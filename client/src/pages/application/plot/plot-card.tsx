import {
  faAddressBook,
  faBolt,
  faDroplet,
  faExpand,
  faFireFlameCurved,
  faFireFlameSimple,
  faLocationDot,
  faStairs,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

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
      <div className="realty-card__address">
        <FontAwesomeIcon className="realty-card__address-icon" icon={faLocationDot} />
        <p className="realty-card__address-value">ул. Добролюбова, 3А, Батайск</p>
      </div>
      <div className="realty-card__client">
        <FontAwesomeIcon className="realty-card__client-icon" icon={faUser} />
        <p className="realty-card__client-value">Петрушенко А.В.</p>
      </div>
      <div className="realty-card__stats-group">
        <div className="realty-card__stat">
          <div className="realty-card__stat-icon-container">
            <FontAwesomeIcon className="realty-card__stat-icon" icon={faExpand} />
          </div>
        </div>
        <div className="realty-card__stat">
          <div className="realty-card__stat-icon-container">
            <FontAwesomeIcon className="realty-card__stat-icon" icon={faExpand} />
          </div>
        </div>
        <div className="realty-card__stat">
          <div className="realty-card__stat-icon-container">
            <FontAwesomeIcon className="realty-card__stat-icon" icon={faExpand} />
          </div>
        </div>
        <div className="realty-card__stat">
          <div className="realty-card__stat-icon-container">
            <FontAwesomeIcon className="realty-card__stat-icon" icon={faExpand} />
          </div>
          <p className="realty-card__stat-value">422 квм</p>
        </div>
      </div>
    </li>
  );
};

export default PlotCard;
