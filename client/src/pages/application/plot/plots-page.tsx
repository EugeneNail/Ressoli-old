import { useEffect, useState } from "react";
import api from "../../../service/api";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application/short-application";
import Spinner from "../../../components/spinner/spinner";
import { ShortPlot } from "../../../model/short-application/short-plot";
import "../applications-page.sass";

function PlotsPage() {
  const [applications, setApplications] = useState<ShortApplication<ShortPlot>[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ShortApplication<ShortPlot>[]>(`/applications/plots`).then((response) => {
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

export default PlotsPage;
