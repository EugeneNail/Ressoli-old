import { FC, useState } from "react";
import Button from "../../../components/button/button";
import PlotCard from "./plot-card";
import "../application.sass";
import { faArrowUpWideShort, faSliders } from "@fortawesome/free-solid-svg-icons";

const PlotsPage: FC = () => {
  const [plots, setPlots] = useState<number[]>([1, 2, 3, 4]);

  return (
    <div className="applications-page">
      <h1 className="applications-page__title">Найдено 32 объекта</h1>
      <Button type="light" action={() => {}} text="Фильтры" leadingIcon={faSliders} />
      <Button type="light" action={() => {}} text="Дата" leadingIcon={faArrowUpWideShort} />
      <ul className="applications-page__list">{plots && plots.map((plot) => <PlotCard plot={plot} />)}</ul>
    </div>
  );
};

export default PlotsPage;
