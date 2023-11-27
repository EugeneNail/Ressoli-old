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
  faWarehouse,
  faShower,
  faSoap,
  faCar,
  faKaaba,
  faTrash,
  faElevator,
  faWater,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import { Apartment } from "../../../model/apartment";

type ApartmentSectionProps = {
  apartment: Apartment;
};

function ApartmentSection({ apartment }: ApartmentSectionProps) {
  return (
    <>
      <h2 className="application-page__subheader">Квартира</h2>
      <section className="application-page__info-group">
        {apartment.hasWater && <ApplicationInfo icon={faDroplet} label="Есть" value="Вода" />}
        {apartment.hasGas && <ApplicationInfo icon={faFire} label="Есть" value="Газ" />}
        {apartment.hasElectricity && <ApplicationInfo icon={faBolt} label="Есть" value="Электричество" />}
        {apartment.hasSewer && <ApplicationInfo icon={faToilet} label="Есть" value="Канализация" />}
      </section>

      <section className="application-page__info-group application-page__info-group_separated">
        <ApplicationInfo icon={faLayerGroup} label="Этаж" value={apartment.level + " / " + apartment.levelCount} />
        <ApplicationInfo icon={faArrowsUpDown} label="Высота потолков" value={`${apartment.ceiling} см`} />
        <ApplicationInfo icon={faBed} label="Комнат в квартире" value={apartment.roomCount} />
        <ApplicationInfo icon={faMaximize} label="Площадь" value={`${apartment.area} квм`} />
      </section>
      <section className="application-page__info-group application-page__info-group_separated">
        <ApplicationInfo icon={faHouseCrack} label="Состояние" value={apartment.condition} />
        <ApplicationInfo icon={faCalendarDays} label="Время постройки" value={apartment.constructionTime} />
        <ApplicationInfo icon={faWarehouse} label="Стены" value={apartment.walls} />
        {apartment.isCorner && <ApplicationInfo icon={faWarehouse} label="" value="Угловая" />}
        {apartment.hasBalcony && <ApplicationInfo icon={faKaaba} label="Есть" value="Балкон" />}
        {apartment.hasLoggia && <ApplicationInfo icon={faKaaba} label="Есть" value="Лоджия" />}
      </section>
      <section className="application-page__info-group application-page__info-group_separated">
        {apartment.hasHotWater && <ApplicationInfo icon={faWater} label="Есть" value="Горячая вода" />}
        {apartment.hasHeating && <ApplicationInfo icon={faTemperatureHigh} label="Есть" value="Отопление" />}
        <ApplicationInfo icon={faShower} label="Ванна" value={apartment.bath} />
        <ApplicationInfo icon={faSoap} label="Санузел" value={apartment.toilet} />
      </section>
      <section className="application-page__info-group application-page__info-group_separated">
        {apartment.hasGarage && <ApplicationInfo icon={faCar} label="Есть" value="Гараж" />}
        {apartment.hasGarbageChute && <ApplicationInfo icon={faTrash} label="Есть" value="Мусоропровод" />}
        {apartment.hasElevator && <ApplicationInfo icon={faElevator} label="Есть" value="Лифт" />}
      </section>
    </>
  );
}

export default ApartmentSection;
