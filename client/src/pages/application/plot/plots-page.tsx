import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../applications-page.sass";
import ApplicationCard from "../application-card/application-card";
import { ShortApplication } from "../../../model/short-application";

function PlotsPage() {
  const [plots, setPlots] = useState<ShortApplication[]>();

  useEffect(() => {
    api
      .get<{ data: ShortApplication[] }>("/applications/plots")
      .then((response) => {
        setPlots(response.data.data);
      })
      .catch((response) => {});
  }, []);

  return (
    <div className="application-page">
      <div className="application-page__settings"></div>
      <div className="application-page__applications">
        {plots?.map((plot) => (
          <ApplicationCard application={plot} />
        ))}
      </div>
    </div>
  );
}

export default PlotsPage;
