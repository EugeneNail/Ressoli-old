import "./application-card.sass";
import Button from "../button/button";
import ApplicationCardInfo from "./application-card-info";
import {
  faBed,
  faBolt,
  faCalendarDays,
  faDroplet,
  faFire,
  faLocationDot,
  faMap,
  faMaximize,
  faRuble,
} from "@fortawesome/free-solid-svg-icons";
import { ShortApplication } from "../../model/short-application/short-application";
import { env } from "../../env";
import { Converter } from "../../service/converter";
import { ShortHouse } from "../../model/short-application/short-house";
import { ShortPlot } from "../../model/short-application/short-plot";
import { compareTypes } from "../../service/compareTypes";

type ApplicationCardProps = {
  application: ShortApplication<ShortPlot | ShortHouse>;
};

function ApplicationCard({
  application: { applicable, area, city, contract, date, houseNumber, id, preview, price, street },
}: ApplicationCardProps) {
  function buildTitle(): string {
    return `Участок ${contract === "Продажа" ? "на продажу" : "под аренду"}`;
  }

  function selectStats() {
    if (compareTypes(applicable, new ShortHouse())) {
      applicable = applicable as ShortHouse;
      return (
        <>
          <ApplicationCardInfo icon={faBed} value={applicable.roomCount} />
          <ApplicationCardInfo icon={faCalendarDays} value={applicable.constructionTime} />
          <ApplicationCardInfo icon={faMap} value={applicable.landArea} unit="квм" />
        </>
      );
    }

    if (compareTypes(applicable, new ShortPlot())) {
      applicable = applicable as ShortPlot;
      return (
        <>
          {applicable.hasWater && <ApplicationCardInfo icon={faDroplet} />}
          {applicable.hasElectricity && <ApplicationCardInfo icon={faBolt} />}
          {applicable.hasGas && <ApplicationCardInfo icon={faFire} />}
        </>
      );
    }
  }

  return (
    <div className="application-card">
      <div className="application-card__info-container">
        <img src={`${env.PHORO_URL}/${preview}`} alt="" className="application-card__preview" />
        <h3 className="application-card__title">{buildTitle()}</h3>
        <div className="application-card__infos">
          <ApplicationCardInfo icon={faLocationDot} value={`г. ${city}, ул. ${street}, д. ${houseNumber}`} />
          <ApplicationCardInfo icon={faRuble} bold value={price} unit={`руб ${contract === "Аренда" ? "/мес" : ""}`} />
          <ApplicationCardInfo icon={faMaximize} value={area} unit="квм" />
        </div>
        <div className="application-card__inner-grid">
          <div className="application-card__stats-container">{selectStats()}</div>
          <p className="application-card__date">{Converter.dateToFull(date)}</p>
          <Button className="application-card__button" style="dotted" action={() => {}} text="Подробнее" to={id} />
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
