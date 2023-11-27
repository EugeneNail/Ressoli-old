import { useEffect, useState } from "react";
import api from "../../../service/api";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application/short-application";
import Spinner from "../../../components/spinner/spinner";
import "../applications-page.sass";
import { ShortApartment } from "../../../model/short-application/short-apartment";

function ApartmentsPage() {
  const [applications, setApplications] = useState<ShortApplication<ShortApartment>[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ShortApplication<ShortApartment>[]>(`/applications/apartments`).then((response) => {
      setApplications(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="applications-page">
          <div className="applications-page__settings"></div>
          <div className="applications-page__applications">
            {applications?.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ApartmentsPage;
