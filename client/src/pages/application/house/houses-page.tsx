import { useEffect, useState } from "react";
import api from "../../../service/api";
import "../applications-page.sass";
import ApplicationCard from "../../../components/application-card/application-card";
import { ShortApplication } from "../../../model/short-application/short-application";
import Spinner from "../../../components/spinner/spinner";
import { ShortHouse } from "../../../model/short-application/short-house";

function HousesPage() {
  const [houses, setHouses] = useState<ShortApplication<ShortHouse>[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: ShortApplication<ShortHouse>[] }>("/applications?type=house").then((response) => {
      setHouses(response.data.data);
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
            {houses?.map((house) => (
              <ApplicationCard key={house.id} application={house} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HousesPage;
