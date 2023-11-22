import "./application-card.sass";
import Button from "../button/button";
import ApplicationCardInfo from "./application-card-info";
import { faBolt, faDroplet, faFire, faLocationDot, faMaximize, faRuble } from "@fortawesome/free-solid-svg-icons";
import { ShortApplication } from "../../model/short-application";
import { env } from "../../env";
import { Converter } from "../../service/converter";

type ApplicationCardProps = {
  application: ShortApplication;
};

function ApplicationCard({ application }: ApplicationCardProps) {
  function buildTitle(): string {
    return `Участок ${application.contract === "Продажа" ? "на продажу" : "под аренду"}`;
  }

  function buildAddress(): string {
    return `г. ${application.city}, ул. ${application.street}, д. ${application.houseNumber}`;
  }

  function buildPrice(): string {
    return `руб ${application.contract === "Аренда" ? "/мес" : ""}`;
  }

  function openInNewTab() {
    window.open(`${window.location.host}/plots/${application.id}`);
  }

  return (
    <div className="application-card">
      <div className="application-card__info-container">
        <img src={`${env.PHORO_URL}/${application.preview}`} alt="" className="application-card__preview" />
        <h3 className="application-card__title">{buildTitle()}</h3>
        <div className="application-card__infos">
          <ApplicationCardInfo icon={faLocationDot} value={buildAddress()} />
          <ApplicationCardInfo icon={faRuble} bold value={"3000000"} unit={buildPrice()} />
          <ApplicationCardInfo icon={faMaximize} value="300" unit="квм" />
        </div>
        <div className="application-card__inner-grid">
          <div className="application-card__stats-container">
            <ApplicationCardInfo icon={faDroplet} />
            <ApplicationCardInfo icon={faBolt} />
            <ApplicationCardInfo icon={faFire} />
          </div>
          <p className="application-card__date">{Converter.dateToFull(application.date)}</p>
          <Button className="application-card__button" style="dotted" action={openInNewTab} text="Подробнее" />
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
