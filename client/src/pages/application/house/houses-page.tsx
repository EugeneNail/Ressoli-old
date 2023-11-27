import { useEffect, useState } from "react";
import api from "../../../service/api";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application/short-application";
import Spinner from "../../../components/spinner/spinner";
import "../applications-page.sass";
import { ShortHouse } from "../../../model/short-application/short-house";

function HousesPage() {
  const [applications, setApplications] = useState<ShortApplication<ShortHouse>[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ShortApplication<ShortHouse>[]>(`/applications/houses`).then((response) => {
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

export default HousesPage;
