import {
  faCalendarDays,
  faCity,
  faCreditCard,
  faFileSignature,
  faRuble,
  faUserTie,
  faBolt,
  faDroplet,
  faFire,
  faMaximize,
  faToilet,
  faRoad,
  faMap,
  faBuildingUser,
  faCar,
  faSoap,
  faShower,
  faLayerGroup,
  faArrowsUpDown,
  faBed,
  faHouseCrack,
  faPeopleRoof,
  faWarehouse,
  faWater,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import "../application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Application } from "../../../model/application";
import api from "../../../service/api";
import { Converter } from "../../../service/converter";
import { useParams } from "react-router";
import Spinner from "../../../components/spinner/spinner";
import { House } from "../../../model/house";

function HousePage() {
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable, photos, date, contract }, setApplication] = useState(
    new Application<House>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: Application<House> }>("/applications/" + id).then((response) => {
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
            <ApplicationInfo icon={faMaximize} label="Площадь" value={`${applicable.area} квм`} />
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

          <h2 className="application-page__subheader">Участок</h2>
          <section className="application-page__info-group">
            <ApplicationInfo icon={faDroplet} label="Вода" value={applicable.water} />
            <ApplicationInfo icon={faFire} label="Газ" value={applicable.gas} />
            <ApplicationInfo icon={faToilet} label="Канализация" value={applicable.sewer} />
            <ApplicationInfo icon={faBolt} label="Электричество" value={applicable.electricity} />
          </section>

          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faLayerGroup} label="Этажей в доме" value={applicable.levelCount} />
            <ApplicationInfo icon={faArrowsUpDown} label="Высота потолков" value={`${applicable.ceiling} см`} />
            <ApplicationInfo icon={faBed} label="Комнат в доме" value={applicable.roomCount} />
            <ApplicationInfo icon={faMaximize} label="Площадь дома" value={`${applicable.area} квм`} />
            <ApplicationInfo icon={faMaximize} label="Площадь участка" value={`${applicable.landArea} квм`} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faHouseCrack} label="Состояние" value={applicable.condition} />
            <ApplicationInfo icon={faCalendarDays} label="Время постройки" value={applicable.constructionTime} />
            <ApplicationInfo icon={faPeopleRoof} label="Крыша" value={applicable.roof} />
            <ApplicationInfo icon={faWarehouse} label="Стены" value={applicable.walls} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faWater} label="Горячая вода" value={applicable.hotWater} />
            <ApplicationInfo icon={faTemperatureHigh} label="Отопление" value={applicable.heating} />
            <ApplicationInfo icon={faShower} label="Ванна" value={applicable.bath} />
            <ApplicationInfo icon={faSoap} label="Санузел" value={applicable.toilet} />
            {applicable.hasGarage && <ApplicationInfo icon={faCar} label="Есть" value="Гараж" />}
          </section>

          {photos.length > 0 && (
            <section className="application-page__info-group">
              <Carousel className="application-page__carousel" photos={photos} />
            </section>
          )}

          <div className="application-page__button-group">
            <Button style="filled" text="В архив" action={() => {}} />
            <Button style="dotted" text="Редактировать" action={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}

export default HousePage;
