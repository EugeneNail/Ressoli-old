import { Navigate } from "react-router";
import { CardApplication } from "../../model/card-application/card-application";
import { ApplicationCardStat } from "./application-card-stat";
import "./application-card.sass";
import { ApplicationCardInfo } from "./application-card-info";

type ApplicationCardProps = {
  application: CardApplication;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  function selectApplicable() {
    if (application.type === "land-parcel") {
      return landParcelStats();
    }
  }

  function landParcelStats() {
    return (
      <>
        {application.applicable.hasWater && <ApplicationCardStat icon="water_drop" />}
        {application.applicable.hasGas && <ApplicationCardStat icon="local_fire_department" />}
        {application.applicable.hasElectricity && <ApplicationCardStat icon="flash_on" />}
        <ApplicationCardStat icon="zoom_out_map" value={application.applicable.area} />
      </>
    );
  }

  function dateToMMDDYYYY() {
    const month = application.date.getMonth() + 1;
    const day = application.date.getDate();
    const year = application.date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <div className="application-card" onClick={() => <Navigate to={"/test"} />}>
      <div className="application-card__status">{application.isActive ? "Active" : "Archived"}</div>
      <img src={"http://localhost:8000/storage/" + application.previewUrl} alt="" className="application-card__image" />
      <div className="application-card__title-grid">
        <div className="application-card__upper-flexbox">
          <h4 className="application-card__title">{application.title}</h4>
          <p className="application-card__address">{application.address}</p>
        </div>
        <div className="application-card__upper-flexbox">
          <p className="application-card__price-name">Property price</p>
          <p className="application-card__price-value">${application.price}</p>
        </div>
      </div>
      <div className="application-card__stats-flexbox">{selectApplicable()}</div>
      <div className="application-card__info-grid">
        <ApplicationCardInfo name="Contract" value={application.contract} />
        <ApplicationCardInfo name="Date" value={dateToMMDDYYYY()} />
        <ApplicationCardInfo name="Client" value={application.client} />
      </div>
    </div>
  );
}
