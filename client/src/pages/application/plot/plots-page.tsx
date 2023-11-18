import { FC, useEffect, useState } from "react";
import Button from "../../../components/button/button";
import api from "../../../service/api";
import "../applications-page.sass";
import ApplicationCard from "../application-card/application-card";
import { ShortApplication } from "../../../model/short-application";

const PlotsPage: FC = () => {
  const [plots, setPlots] = useState<ShortApplication[]>();

  useEffect(() => {
    api
      .get<{ data: ShortApplication[] }>("/applications/plots")
      .then((response) => {
        setPlots(response.data.data);
        console.log(1, response);
      })
      .catch((response) => {
        console.log(2, response);
      });
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
};

export default PlotsPage;
