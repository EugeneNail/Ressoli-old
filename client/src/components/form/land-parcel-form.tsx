import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Dropdown } from "../custom-control/dropdown";
import { Numeric } from "../custom-control/numeric";

export class LandParcelFormErrors {
  gas: string[] = [];
  water: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  area: string[] = [];
}

type LandParcelFormProps = FormProps<LandParcelFormErrors> & {};

export function LandParcelForm({ submit, errors }: LandParcelFormProps) {
  const test = ["First", "Second", "Third", "Fourth"];

  return (
    <form action="" className="form" onSubmit={submit}>
      <div className="form__control-group">
        <Dropdown
          label="Water"
          name="water"
          icon="water_drop"
          options={test}
          errors={errors.values.water}
          resetError={errors.reset}
        />
        <Dropdown
          label="Gas"
          name="gas"
          icon="local_fire_department"
          options={test}
          errors={errors.values.gas}
          resetError={errors.reset}
        />
        <Dropdown
          label="Electicity"
          name="electricity"
          icon="flash_on"
          options={test}
          errors={errors.values.electricity}
          resetError={errors.reset}
        />
        <Dropdown
          label="Sewer"
          name="sewer"
          icon="water_pump"
          options={test}
          errors={errors.values.sewer}
          resetError={errors.reset}
        />
        <Numeric
          label="Area"
          name="area"
          icon="zoom_out_map"
          min={1}
          step={1}
          max={10000}
          errors={errors.values.area}
          resetError={errors.reset}
        />
      </div>
      <div className="form__button-group">
        <Button className="form__button" text="Confirm" />
      </div>
    </form>
  );
}
