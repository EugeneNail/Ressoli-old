import "../application-page/application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Application } from "../../../model/application";
import api from "../../../service/api";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../../components/spinner/spinner";
import { Plot } from "../../../model/plot";
import AddressSection from "../application-page/address-section";
import ApplicationSection from "../application-page/application-section";
import { faDroplet, faFire, faToilet, faBolt, faMaximize } from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";

function PlotPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable: plot, photos, date, contract }, setApplication] = useState(
    new Application<Plot>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application<Plot>>("/applications/plots/" + id).then((response) => {
      setApplication(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="application-page">
          <h1 className="application-page__header">Заявка #{id} о земельном участке</h1>

          <ApplicationSection user={user} contract={contract} date={date} client={client} />
          <AddressSection address={address} />

          <h2 className="application-page__subheader">Участок</h2>
          <section className="application-page__info-group">
            <ApplicationInfo icon={faDroplet} label="Вода" value={plot.water} />
            <ApplicationInfo icon={faFire} label="Газ" value={plot.gas} />
            <ApplicationInfo icon={faToilet} label="Канализация" value={plot.sewer} />
            <ApplicationInfo icon={faBolt} label="Электричество" value={plot.electricity} />
            <ApplicationInfo icon={faMaximize} label="Площадь" value={`${plot.area} квм`} />
          </section>

          {photos.length > 0 && (
            <div className="application-page__info-group">
              <Carousel className="application-page__carousel" photos={photos} />
            </div>
          )}

          <div className="application-page__button-group">
            <Button style="filled" text="В архив" action={() => {}} />
            <Button style="dotted" text="Редактировать" action={() => navigate(`edit`)} />
          </div>
        </div>
      )}
    </>
  );
}

export default PlotPage;
