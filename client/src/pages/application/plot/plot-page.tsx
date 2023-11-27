import "../application-page/application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Application } from "../../../model/application";
import api from "../../../service/api";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../../components/spinner/spinner";
import { Plot } from "../../../model/plot";
import PlotSection from "../application-page/plot-section";
import AddressSection from "../application-page/address-section";
import ApplicationSection from "../application-page/application-section";

function PlotPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable: plot, photos, date, contract }, setApplication] = useState(
    new Application<Plot>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: Application<Plot> }>("/applications/" + id).then((response) => {
      setApplication(response.data.data);
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

          <PlotSection plot={plot} />

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
