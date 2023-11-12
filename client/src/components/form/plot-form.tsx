import { FC } from "react";
import { FormState } from "../../model/form-state";
import Button from "../button/button";
import SelectBox from "../inputbox/selectbox";
import Numberbox from "../inputbox/numberbox";
import { PlotOptions } from "../../model/plot-options";

export class PlotFormFields {
  water: string = "";
  gas: string = "";
  electricity: string = "";
  sewer: string = "";
  area: number = 0;
}

export class PlotFormErrors {
  water: string[] = [];
  gas: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  area: string[] = [];
}

type PlotFormProps = {
  submit?: () => void;
  back?: () => void;
  state: FormState<PlotFormFields, PlotFormErrors>;
};

const PlotForm: FC<PlotFormProps> = ({ back, submit, state: { errors, setField, clearFieldErrors } }) => {
  const { water, gas, electricity, sewer } = new PlotOptions();

  return (
    <form action="" className="form">
      <h1 className="form__header">Участок</h1>
      <div className="form__input-group">
        <SelectBox
          label="Вода"
          name="water"
          options={water}
          onChange={setField}
          errors={errors.water}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          label="Газ"
          name="gas"
          options={gas}
          onChange={setField}
          errors={errors.gas}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          label="Канализация"
          name="sewer"
          options={sewer}
          onChange={setField}
          errors={errors.sewer}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          label="Электричество"
          name="electricity"
          options={electricity}
          onChange={setField}
          errors={errors.electricity}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          label="Площадь"
          name="area"
          onChange={setField}
          errors={errors.area}
          clearErrors={clearFieldErrors}
          step={1}
          min={0}
          max={10000}
        />
      </div>
      <div className="form__button-group">
        <Button wide type="light" text="Назад" action={() => back?.()} />
        <Button wide type="regular" text="Далее" action={() => submit?.()} />
      </div>
    </form>
  );
};

export default PlotForm;
