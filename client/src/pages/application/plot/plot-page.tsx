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
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import "../application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import Button from "../../../components/button/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { env } from "../../../env";

function PlotPage() {
  const urls: string[] = [];
  const [position, setPosition] = useState([47.119647, 39.742708]);

  useEffect(() => {
    axios
      .get(`https://geocode-maps.yandex.ru/1.x/?apikey=${env.YANDEX_API_KEY}&format=json&geocode=Ростов-на-Дону`)
      .then((response) => {
        const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .reverse()
          .map(parseFloat);
        setPosition(coords);
      });
  }, []);

  function renderMap() {
    const properties = {
      balloonContentBody: "г. Ростов-на-Дону, ул. Добролюбова, д. 3А",
      hintContent: "г. Ростов-на-Дону, ул. Добролюбова, д. 3А",
    };

    return (
      <YMaps query={{ apikey: env.YANDEX_API_KEY }}>
        <Map
          className="application-page__map"
          defaultState={{ center: position, zoom: 15, behaviors: ["drag"] }}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
        >
          <Placemark defaultGeometry={position} properties={properties} />
          <ZoomControl options={{ position: { right: 10, top: 10 } }} />
        </Map>
      </YMaps>
    );
  }

  return (
    <div className="application-page">
      <h1 className="application-page__header">Заявка #264 о земельном участке</h1>
      <h2 className="application-page__subheader">Заявка</h2>
      <div className="application-page__info-group">
        <ApplicationInfo icon={faUserTie} label="Агент" value="Ирина Гринь" />
        <ApplicationInfo icon={faFileSignature} label="Форма договора" value="Продажа" />
        <ApplicationInfo icon={faBuildingUser} label="Клиент" value={`Владимир Дробышевский\n8 (800) 555-35-35`} />
        <ApplicationInfo icon={faCalendarDays} label="Дата размещения" value="23 ноября 2023г" />
        <ApplicationInfo icon={faMaximize} label="Площадь" value="300 квм" />
        <ApplicationInfo icon={faRuble} label="Стоимость" value="30 000 000 с ДНС" />
        <ApplicationInfo icon={faCreditCard} label="Ипотека" value="Отсутствует" />
      </div>
      <h2 className="application-page__subheader">Адрес</h2>
      <div className="application-page__info-group">
        <ApplicationInfo icon={faCity} label="Город" value="Батайск" />
        <ApplicationInfo icon={faRoad} label="Улица" value="50 Лет Октября" />
        <ApplicationInfo icon={faMap} label="Номер участка" value="38" />
        <div className="application-page__map-container">{renderMap()}</div>
      </div>
      <h2 className="application-page__subheader">Участок</h2>
      <div className="application-page__info-group">
        <ApplicationInfo icon={faDroplet} label="Вода" value="Скважина" />
        <ApplicationInfo icon={faFire} label="Газ" value="Газгольдер" />
        <ApplicationInfo icon={faToilet} label="Канализация" value="Локальная очистная станция" />
        <ApplicationInfo icon={faBolt} label="Электричество" value="По воздуху" />
      </div>
      <div className="application-page__info-group">
        <Carousel className="application-page__carousel" photoUrls={urls} />
      </div>

      <div className="application-page__button-group">
        <Button style="filled" text="В архив" action={() => {}} />
        <Button style="dotted" text="Редактировать" action={() => {}} />
      </div>
    </div>
  );
}

export default PlotPage;
