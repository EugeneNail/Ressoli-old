import { useEffect, useState } from "react";
import { ApplicationCard } from "../../components/application-card/application-card";
import { CardApplication } from "../../model/card-application/card-application";
import "./applications-page.sass";
import api from "../../service/api";

export function LandParcelsPage() {
  const [applications, setApplications] = useState<CardApplication[]>([]);

  useEffect(() => {
    api
      .get<CardApplication[]>("/applications/land-parcels?types[]=land-parcel")
      .then(({ data }) => setApplications(data));
  }, []);

  return (
    <div className="applications-page">
      <div className="applications-page__heading">
        <h1 className="applications-page__header">Land Parcels</h1>
        <p className="applications-page__subheader">Browse, add and search with seconds</p>
      </div>
      <div className="applications-page__grid">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  );
}
