import { faDroplet, faFire, faToilet, faBolt, faMaximize } from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import { Plot } from "../../../model/plot";

type PlotSectionProp = {
  plot: Plot;
};

function PlotSection({ plot }: PlotSectionProp) {
  return (
    <>
      <h2 className="application-page__subheader">Участок</h2>
      <section className="application-page__info-group">
        <ApplicationInfo icon={faDroplet} label="Вода" value={plot.water} />
        <ApplicationInfo icon={faFire} label="Газ" value={plot.gas} />
        <ApplicationInfo icon={faToilet} label="Канализация" value={plot.sewer} />
        <ApplicationInfo icon={faBolt} label="Электричество" value={plot.electricity} />
        <ApplicationInfo icon={faMaximize} label="Площадь" value={`${plot.area} квм`} />
      </section>
    </>
  );
}

export default PlotSection;
