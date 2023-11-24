import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../applications-page.sass";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application";
import Spinner from "../../../components/spinner/spinner";

function PlotsPage() {
  const [plots, setPlots] = useState<ShortApplication[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: ShortApplication[] }>("/applications").then((response) => {
      setPlots(response.data.data);
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
            {plots?.map((plot) => (
              <ApplicationCard application={plot} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PlotsPage;
