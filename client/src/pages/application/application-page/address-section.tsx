import { faCity, faRoad, faMap, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { Map, YMaps, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import ApplicationInfo from "../../../components/application-info/application-info";
import { Address } from "../../../model/address";
import { Converter } from "../../../service/converter";

type AddressSectionProps = {
  address: Address;
  label: string;
};

function AddressSection({ address, label }: AddressSectionProps) {
  return (
    <>
      <h2 className="application-page__subheader">Адрес</h2>
      <section className="application-page__info-group">
        <ApplicationInfo icon={faCity} label={address.typeOfCity} value={address.city} />
        <ApplicationInfo icon={faRoad} label={address.typeOfStreet} value={address.street} />
        <ApplicationInfo icon={faMap} label={label} value={address.houseNumber} />
        {address.apartmentNumber && address.apartmentNumber.length && (
          <ApplicationInfo icon={faBuilding} label="Номер квартиры" value={address.apartmentNumber} />
        )}
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
    </>
  );
}

export default AddressSection;
