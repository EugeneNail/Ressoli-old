import { Map, Marker, ZoomControl } from "pigeon-maps";
import { Gallery } from "../../components/gallery/gallery";
import { Spoiler } from "../../components/spoler/spoiler";
import { ApplicationPageInfo } from "./application-page-info";
import "./application-page.sass";
import { useEffect, useState } from "react";
import { Icon } from "../../components/icon/icon";
import Button, { ButtonStyle } from "../../components/button/button";
import { LandParcel } from "../../model/land-parcel";
import { Application } from "../../model/application";
import { areEqual } from "../../service/are-equal";
import api from "../../service/api";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";

export function LandParcelPage() {
  const [center, setCenter] = useState<[number, number]>([47.2357, 39.7015]);
  const [application, setApplication] = useState(new Application<LandParcel>());
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Application<LandParcel>>("/applications/land-parcels/" + id).then(({ data }) => {
      const parts = application.address.position.split(" ").map(parseFloat);
      setApplication(data);
      setCenter([parts[0], parts[1]]);
    });
  }, []);

  function addressToString() {
    const address = application.address;
    return (
      `${address.addressNumber} ${address.street} Street, ${address.city}` +
      (address.postalCode ? `, ${address.postalCode}` : "")
    );
  }

  function selectDetails() {
    if (areEqual(application.applicable, new LandParcel())) {
      return (
        <div className="application-page__detail-group">
          <ApplicationPageInfo icon="water_drop" value={application.applicable.water} tooltip="Water" />
          <ApplicationPageInfo icon="local_fire_department" value={application.applicable.gas} tooltip="Gas" />
          <ApplicationPageInfo icon="flash_on" value={application.applicable.electricity} tooltip="Electricity" />
          <ApplicationPageInfo icon="water_pump" value={application.applicable.sewer} tooltip="Sewer" />
          <ApplicationPageInfo icon="zoom_out_map" value={application.applicable.area} tooltip="Area" />
        </div>
      );
    }
  }

  function dateToMMDDYYYY() {
    const date = new Date(application.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <div className="application-page">
      <div className="application-page__main-container">
        <div className="application-page__headline">
          <h1 className="application-page__title">
            {application.applicable.title != null ? application.applicable.title : "Land Parcel"}
          </h1>
          <div className="application-page__status">{application.isActive ? "Active" : "Archived"}</div>
          <Button
            className={classNames("application-page__button", { inactive: !application.isActive })}
            text="Archive"
            style={ButtonStyle.secondary}
          />
          <Button className="application-page__button" text="Edit" action={() => navigate("edit")} />
        </div>
        <div className="application-page__infos">
          <ApplicationPageInfo tooltip="Date" value={dateToMMDDYYYY()} icon="calendar_month" />
          <ApplicationPageInfo
            tooltip="Client"
            value={`${application.client.name} ${application.client.surname}`}
            icon="account_box"
          />
          <ApplicationPageInfo
            tooltip="Client's phone number"
            value={application.client.phoneNumber}
            icon="contact_phone"
          />
          <ApplicationPageInfo tooltip="Contract" value={application.terms.contract} icon="description" />
          <ApplicationPageInfo tooltip="Price" value={application.terms.price} icon="payments" />
        </div>
        <div className="application-page__address">
          <Icon className="application-page__address-icon" filled name="location_on" />
          <a href="#map" className="application-page__address-text">
            {addressToString()}
          </a>
        </div>
        {application.photos.length > 0 && <Gallery className="application-page__gallery" photos={application.photos} />}
      </div>
      <Spoiler title="Details" open>
        <div className="application-page__details">{selectDetails()}</div>
      </Spoiler>
      <Spoiler title="Location" open>
        <div className="application-page__location">
          <div className="application-page__location-map" id="map">
            <Map defaultZoom={15} defaultCenter={center} metaWheelZoom animate={false}>
              <ZoomControl />
              <Marker width={50} anchor={center} color="red" />
            </Map>
          </div>
        </div>
      </Spoiler>
    </div>
  );
}
