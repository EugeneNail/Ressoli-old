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
import {
  faDroplet,
  faFire,
  faToilet,
  faBolt,
  faLayerGroup,
  faArrowsUpDown,
  faMaximize,
  faHouseCrack,
  faWarehouse,
  faWater,
  faTemperatureHigh,
  faShower,
  faSoap,
  faElevator,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import { Apartment } from "../../../model/apartment";
import { Room } from "../../../model/room";

function RoomPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ user, client, address, applicable: room, photos, date, contract }, setApplication] = useState(
    new Application<Room>()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application<Apartment>>("/applications/rooms/" + id).then((response) => {
      setApplication(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="application-page">
          <h1 className="application-page__header">Заявка #{id} о комнате</h1>

          <ApplicationSection user={user} contract={contract} date={date} client={client} />
          <AddressSection address={address} label="Номер дома" />

          <h2 className="application-page__subheader">Квартира</h2>
          <section className="application-page__info-group">
            {room.hasWater && <ApplicationInfo icon={faDroplet} label="Есть" value="Вода" />}
            {room.hasGas && <ApplicationInfo icon={faFire} label="Есть" value="Газ" />}
            {room.hasElectricity && <ApplicationInfo icon={faBolt} label="Есть" value="Электричество" />}
            {room.hasSewer && <ApplicationInfo icon={faToilet} label="Есть" value="Канализация" />}
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faLayerGroup} label="Этаж" value={room.level + " / " + room.levelCount} />
            <ApplicationInfo icon={faArrowsUpDown} label="Высота потолков" value={`${room.ceiling} см`} />
            <ApplicationInfo icon={faMaximize} label="Площадь" value={`${room.area} квм`} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            <ApplicationInfo icon={faHouseCrack} label="Состояние" value={room.condition} />
            <ApplicationInfo icon={faWarehouse} label="Стены" value={room.walls} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            {room.hasHotWater && <ApplicationInfo icon={faWater} label="Есть" value="Горячая вода" />}
            {room.hasHeating && <ApplicationInfo icon={faTemperatureHigh} label="Есть" value="Отопление" />}
            <ApplicationInfo icon={faShower} label="Ванна" value={room.bath} />
            <ApplicationInfo icon={faSoap} label="Санузел" value={room.toilet} />
          </section>
          <section className="application-page__info-group application-page__info-group_separated">
            {room.hasGarbageChute && <ApplicationInfo icon={faTrash} label="Есть" value="Мусоропровод" />}
            {room.hasElevator && <ApplicationInfo icon={faElevator} label="Есть" value="Лифт" />}
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

export default RoomPage;
