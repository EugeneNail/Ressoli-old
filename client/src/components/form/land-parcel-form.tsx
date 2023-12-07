import { useEffect, useState } from "react";
import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Dropdown } from "../custom-control/dropdown";
import { Numeric } from "../custom-control/numeric";
import { LandParcelOptions } from "../../model/options/land-parcel-options";
import api from "../../service/api";
import { SaveMark } from "./save-mark";
import { Saveable } from "../../model/saveable";
import { Field } from "../custom-control/field";
import { LandParcel } from "../../model/land-parcel";

export class LandParcelFormErrors {
  gas: string[] = [];
  water: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  area: string[] = [];
  title: string[] = [];
}

type LandParcelFormProps = FormProps<LandParcelFormErrors, LandParcel> & Saveable;

export function LandParcelForm({
  submit,
  errors,
  saved,
  unsave,
  initialState = new LandParcel(),
}: LandParcelFormProps) {
  console.log(initialState);
  const [options, setOptions] = useState(new LandParcelOptions());
  useEffect(() => {
    api.get<LandParcelOptions>("/options/land-parcel").then(({ data }) => setOptions(data));
  }, []);

  return (
    <form action="" method="POST" className="form" onSubmit={submit} onClick={unsave}>
      <div className="form__control-group">
        <Dropdown
          label="Water"
          name="water"
          icon="water_drop"
          options={options.water}
          errors={errors.values.water}
          resetError={errors.reset}
          initialValue={initialState?.water}
        />
        <Dropdown
          label="Gas"
          name="gas"
          icon="local_fire_department"
          options={options.gas}
          errors={errors.values.gas}
          resetError={errors.reset}
          initialValue={initialState?.gas}
        />
        <Dropdown
          label="Electicity"
          name="electricity"
          icon="flash_on"
          options={options.electricity}
          errors={errors.values.electricity}
          resetError={errors.reset}
          initialValue={initialState?.electricity}
        />
        <Dropdown
          label="Sewer"
          name="sewer"
          icon="water_pump"
          options={options.sewer}
          errors={errors.values.sewer}
          resetError={errors.reset}
          initialValue={initialState?.sewer}
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
          initialValue={initialState?.area?.toString()}
        />
        <Field
          label="Title (optional)"
          name="title"
          icon="subtitles"
          errors={errors.values.title}
          resetError={errors.reset}
          initialValue={initialState?.title}
        />
      </div>
      {!saved && (
        <div className="form__button-group">
          <Button className="form__button" text="Confirm" />
        </div>
      )}
      {saved && <SaveMark />}
    </form>
  );
}
