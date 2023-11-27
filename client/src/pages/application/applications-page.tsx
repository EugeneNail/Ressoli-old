import { useEffect, useState } from "react";
import api from "../../service/api";
import ApplicationCard from "../../components/application-card/application-card";
import { ShortApplication } from "../../model/short-application/short-application";
import Spinner from "../../components/spinner/spinner";
import { ShortHouse } from "../../model/short-application/short-house";
import { ShortPlot } from "../../model/short-application/short-plot";
import "./applications-page.sass";
import { ShortApartment } from "../../model/short-application/short-apartment";

type ApplicationsPageProps = {
  type: string;
};

function ApplicationsPage<T extends ShortHouse | ShortPlot | ShortApartment>({ type }: ApplicationsPageProps) {
  const [applications, setApplications] = useState<ShortApplication<T>[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(1);
    api
      .get<{ data: ShortApplication<T>[] }>(`/applications?type=${type}`)
      .then((response) => {
        setApplications(response.data.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
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

export default ApplicationsPage;
