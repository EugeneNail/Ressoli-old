import {
  faCalendarDays,
  faCity,
  faCreditCard,
  faFileSignature,
  faRuble,
  faUserTie,
  faRoad,
  faMap,
  faBuildingUser,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import "../application-page/application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Application } from "../../../model/application";
import api from "../../../service/api";
import { Converter } from "../../../service/converter";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../../components/spinner/spinner";
import { Plot } from "../../../model/plot";
import PlotSection from "./plot-section";
import { House } from "../../../model/house";
import { compareTypes } from "../../../service/compareTypes";
import HouseSection from "./house-section";
import { Apartment } from "../../../model/apartment";
import ApartmentSection from "./apartment-section";

function ApplicationPage<T>() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable, photos, date, contract }, setApplication] = useState(
    new Application<T>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: Application<T> }>("/applications/" + id).then((response) => {
      setApplication(response.data.data);
      setLoading(false);
    });
  }, []);

  function selectApplicableSection() {
    if (compareTypes(applicable, new Plot())) {
      return <PlotSection plot={applicable as Plot} />;
    }

    if (compareTypes(applicable, new House())) {
      return <HouseSection house={applicable as House} />;
    }

    if (compareTypes(applicable, new Apartment())) {
      return <ApartmentSection apartment={applicable as Apartment} />;
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="application-page">
          <h1 className="application-page__header">Заявка #{id} о земельном участке</h1>
          <h2 className="application-page__subheader">Заявка</h2>
          <section className="application-page__info-group">
            <ApplicationInfo icon={faUserTie} label="Агент" value={`${user.name} ${user.surname}`} />
            <ApplicationInfo icon={faFileSignature} label="Форма договора" value={contract.contract} />
            <ApplicationInfo
              icon={faBuildingUser}
              label="Клиент"
              value={`${client.name} ${client.surname}\n${client.phoneNumber}`}
            />
            <ApplicationInfo icon={faCalendarDays} label="Дата размещения" value={Converter.dateToFull(date)} />
            <ApplicationInfo
              icon={faRuble}
              label="Стоимость"
              value={`${contract.price} ${contract.hasVat ? "с учетом НДС" : ""}`}
            />
            <ApplicationInfo
              icon={faCreditCard}
              label="Ипотека"
              value={contract.hasMortgage ? "Присутствует" : "Отсутствует"}
            />
          </section>

          <h2 className="application-page__subheader">Адрес</h2>
          <section className="application-page__info-group">
            <ApplicationInfo icon={faCity} label={address.typeOfCity} value={address.city} />
            <ApplicationInfo icon={faRoad} label={address.typeOfStreet} value={address.street} />
            <ApplicationInfo icon={faMap} label="Номер участка" value={address.houseNumber} />
            <div className="application-page__map-container">
              <YMaps>
                <Map
                  className="application-page__map"
                  state={{ center: Converter.positionToReadable(address.position), zoom: 15, behaviors: ["drag"] }}
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                >
                  <Placemark
                    geometry={Converter.positionToReadable(address.position)}
                    properties={{
                      balloonContentBody: address.label,
                      hintContent: address.label,
                    }}
                  />
                  <ZoomControl options={{ position: { right: 10, top: 10 } }} />
                </Map>
              </YMaps>
            </div>
          </section>

          {selectApplicableSection()}

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

export default ApplicationPage;
