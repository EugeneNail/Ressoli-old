import { FC } from "react";
import "./application-card.sass";
import Button from "../../../components/button/button";
import ApplicationInfo from "./application-info";
import { faBolt, faDroplet, faFire, faLocationDot, faMaximize, faRuble } from "@fortawesome/free-solid-svg-icons";
import { ShortApplication } from "../../../model/short-application";
import { Timestamp } from "../../../service/timestamp";

type ApplicationCardProps = {
  application: ShortApplication;
};

const ApplicationCard: FC<ApplicationCardProps> = ({ application }) => {
  const buildTitle = (): string => {
    return "Участок " + (application.contract === "Продажа" ? "на продажу" : "под аренду");
  };

  const buildAddress = (): string => {
    return "г. " + application.city + ", ул. " + application.street + ", д. " + application.houseNumber;
  };

  const buildPrice = (): string => {
    return "руб" + (application.contract === "Аренда" ? "/мес" : "");
  };

  const openInNewTab = () => {
    window.open(window.location.host + "/plots/" + application.id);
  };

  return (
    <div className="application-card">
      <img src={"http://localhost:8000/storage/" + application.preview} alt="" className="application-card__preview" />
      <div className="application-card__info-container">
        <h3 className="application-card__title">{buildTitle()}</h3>
        <div className="application-card__infos">
          <ApplicationInfo icon={faLocationDot} value={buildAddress()} />
          <ApplicationInfo icon={faRuble} bold value={"3000000"} unit={buildPrice()} />
          <ApplicationInfo icon={faMaximize} value="300" unit="квм" />
        </div>
        <div className="application-card__inner-grid">
          <div className="application-card__stats-container">
            <ApplicationInfo icon={faDroplet} />
            <ApplicationInfo icon={faBolt} />
            <ApplicationInfo icon={faFire} />
          </div>
          <p className="application-card__date">{new Timestamp(application.date).getTraditionalDate()}</p>
          <Button className="application-card__button" style="dotted" action={openInNewTab} text="Подробнее" />
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
