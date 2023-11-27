import { FormState } from "../../model/form-state";
import Button from "../button/button";
import SelectBox from "../inputbox/selectbox";
import Numberbox from "../inputbox/numberbox";
import { faBolt, faDroplet, faFire, faMaximize, faToilet } from "@fortawesome/free-solid-svg-icons";
import { Plot } from "../../model/plot";
import { PlotOptions } from "../../model/options/plot-options";
import { useEffect, useState } from "react";
import api from "../../service/api";

export class PlotFormErrors {
  water: string[] = [];
  gas: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  area: string[] = [];
}

type PlotFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<Plot, PlotFormErrors>;
};

function PlotForm({ back, submit, state: { fields, errors, setField, clearFieldErrors } }: PlotFormProps) {
  const [options, setOptions] = useState(new PlotOptions());

  useEffect(() => {
    api.get("/options/plot").then((response) => setOptions(response.data));
  }, []);

  return (
    <form action="" className="form">
      <h1 className="form__header">Участок</h1>
      <div className="form__input-group">
        <SelectBox
          value={fields.water}
          label="Вода"
          name="water"
          icon={faDroplet}
          options={options.water}
          onChange={setField}
          errors={errors.water}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.gas}
          label="Газ"
          name="gas"
          icon={faFire}
          options={options.gas}
          onChange={setField}
          errors={errors.gas}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.sewer}
          label="Канализация"
          name="sewer"
          icon={faToilet}
          options={options.sewer}
          onChange={setField}
          errors={errors.sewer}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.electricity}
          label="Электричество"
          name="electricity"
          icon={faBolt}
          options={options.electricity}
          onChange={setField}
          errors={errors.electricity}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.area}
          label="Площадь"
          name="area"
          icon={faMaximize}
          onChange={setField}
          errors={errors.area}
          clearErrors={clearFieldErrors}
          step={1}
          min={0}
          max={10000}
        />
      </div>
      <div className="form__button-group">
        <Button wide style="dotted" text="Назад" action={back} />
        <Button wide style="filled" text="Далее" action={submit} />
      </div>
    </form>
  );
}

export default PlotForm;
