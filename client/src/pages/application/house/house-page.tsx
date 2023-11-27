import "../application-page/application-page.sass";
import Carousel from "../../../components/carousel/carousel";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Application } from "../../../model/application";
import api from "../../../service/api";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../../components/spinner/spinner";
import AddressSection from "../application-page/address-section";
import ApplicationSection from "../application-page/application-section";
import { House } from "../../../model/house";
import {
  faDroplet,
  faFire,
  faToilet,
  faBolt,
  faLayerGroup,
  faArrowsUpDown,
  faBed,
  faMaximize,
  faHouseCrack,
  faCalendarDays,
  faPeopleRoof,
  faWarehouse,
  faWater,
  faTemperatureHigh,
  faShower,
  faSoap,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";

function HousePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable: house, photos, date, contract }, setApplication] = useState(
    new Application<House>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application<House>>("/applications/houses/" + id).then((response) => {
      setApplication(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="application-page">
          <h1 className="application-page__header">Заявка #{id} о частном доме</h1>

          <ApplicationSection user={user} contract={contract} date={date} client={client} />
          <AddressSection address={address} />

          <h2 className="application-page__subheader">Дом</h2>
          <section className="application-page__info-group">
            <ApplicationInfo icon={faDroplet} label="Вода" value={house.water} />
            <ApplicationInfo icon={faFire} label="Газ" value={house.gas} />
            <ApplicationInfo icon={faToilet} label="Канализация" value={house.sewer} />
            <ApplicationInfo icon={faBolt} label="Электричество" value={house.electricity} />
          </section>

          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faLayerGroup} label="Этажей в доме" value={house.levelCount} />
            <ApplicationInfo icon={faArrowsUpDown} label="Высота потолков" value={`${house.ceiling} см`} />
            <ApplicationInfo icon={faBed} label="Комнат в доме" value={house.roomCount} />
            <ApplicationInfo icon={faMaximize} label="Площадь дома" value={`${house.area} квм`} />
            <ApplicationInfo icon={faMaximize} label="Площадь участка" value={`${house.landArea} квм`} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faHouseCrack} label="Состояние" value={house.condition} />
            <ApplicationInfo icon={faCalendarDays} label="Время постройки" value={house.constructionTime} />
            <ApplicationInfo icon={faPeopleRoof} label="Крыша" value={house.roof} />
            <ApplicationInfo icon={faWarehouse} label="Стены" value={house.walls} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faWater} label="Горячая вода" value={house.hotWater} />
            <ApplicationInfo icon={faTemperatureHigh} label="Отопление" value={house.heating} />
            <ApplicationInfo icon={faShower} label="Ванна" value={house.bath} />
            <ApplicationInfo icon={faSoap} label="Санузел" value={house.toilet} />
            {house.hasGarage && <ApplicationInfo icon={faCar} label="Есть" value="Гараж" />}
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

export default HousePage;
