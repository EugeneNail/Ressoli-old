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
import { House } from "../../../model/house";

type HouseSectionProps = {
  house: House;
};

function HouseSection({ house }: HouseSectionProps) {
  return (
    <>
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
    </>
  );
}

export default HouseSection;
