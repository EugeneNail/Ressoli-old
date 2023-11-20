import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../applications-page.sass";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application";

function PlotsPage() {
  const [plots, setPlots] = useState<ShortApplication[]>();

  useEffect(() => {
    api.get<{ data: ShortApplication[] }>("/applications/plots").then((response) => {
      setPlots(response.data.data);
    });
  }, []);

  return (
    <div className="applications-page">
      <div className="applications-page__settings"></div>
      <div className="applications-page__applications">
        {plots?.map((plot) => (
          <ApplicationCard application={plot} />
        ))}
      </div>
    </div>
  );
}

export default PlotsPage;
