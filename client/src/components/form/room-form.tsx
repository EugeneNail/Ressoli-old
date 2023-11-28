import { FormState } from "../../model/form-state";
import Button from "../button/button";
import SelectBox from "../inputbox/selectbox";
import Numberbox from "../inputbox/numberbox";
import {
  faHouseCrack,
  faLayerGroup,
  faMaximize,
  faShower,
  faSoap,
  faWarehouse,
  faArrowsUpDown,
  faDroplet,
  faFire,
  faBolt,
  faToilet,
  faWater,
  faTemperatureHigh,
  faTrash,
  faElevator,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../inputbox/checkbox";
import { useEffect, useState } from "react";
import api from "../../service/api";
import { Room } from "../../model/room";
import { RoomOptions } from "../../model/options/room-options";

export class RoomFormErrors {
  walls: string[] = [];
  condition: string[] = [];
  bath: string[] = [];
  toilet: string[] = [];
  levelCount: string[] = [];
  level: string[] = [];
  area: string[] = [];
  ceiling: string[] = [];
}

type RoomFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<Room, RoomFormErrors>;
};

function RoomForm({ back, submit, state: { fields, errors, setField, clearFieldErrors } }: RoomFormProps) {
  const [options, setOptions] = useState(new RoomOptions());

  useEffect(() => {
    api.get<RoomOptions>("/options/room").then((response) => setOptions(response.data));
  }, []);

  return (
    <form action="" className="form house-form">
      <h1 className="form__header">Комната</h1>
      <div className="form__input-group">
        <Checkbox value={fields.hasWater} label="Вода" name="hasWater" icon={faDroplet} onChange={setField} />
        <Checkbox value={fields.hasGas} label="Газ" name="hasGas" icon={faFire} onChange={setField} />
        <Checkbox
          value={fields.hasElectricity}
          label="Электричество"
          name="hasElectricity"
          icon={faBolt}
          onChange={setField}
        />
        <Checkbox value={fields.hasSewer} label="Канализация" name="hasSewer" icon={faToilet} onChange={setField} />
      </div>
      <div className="form__input-group">
        <Numberbox
          value={fields.level}
          label="Этаж"
          name="level"
          icon={faLayerGroup}
          min={1}
          step={1}
          max={100}
          onChange={setField}
          errors={errors.level}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.levelCount}
          label="Этажей в доме"
          name="levelCount"
          icon={faLayerGroup}
          min={1}
          step={1}
          max={100}
          onChange={setField}
          errors={errors.levelCount}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.ceiling}
          label="Высота потолков"
          name="ceiling"
          icon={faArrowsUpDown}
          min={1}
          step={0.01}
          max={5}
          precision={2}
          onChange={setField}
          errors={errors.area}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.area}
          label="Площадь"
          name="area"
          icon={faMaximize}
          min={1}
          step={0.05}
          max={10000}
          precision={2}
          onChange={setField}
          errors={errors.area}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__input-group">
        <SelectBox
          value={fields.condition}
          label="Состояние"
          name="condition"
          icon={faHouseCrack}
          options={options.condition}
          onChange={setField}
          errors={errors.condition}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.walls}
          label="Материал стен"
          name="walls"
          icon={faWarehouse}
          options={options.walls}
          onChange={setField}
          errors={errors.walls}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__input-group">
        <Checkbox
          value={fields.hasHotWater}
          label="Горячая вода"
          name="hasHotWater"
          icon={faWater}
          onChange={setField}
        />
        <Checkbox
          value={fields.hasHeating}
          label="Отопление"
          name="hasHeating"
          icon={faTemperatureHigh}
          onChange={setField}
        />
        <SelectBox
          value={fields.bath}
          label="Ванна"
          name="bath"
          icon={faShower}
          options={options.bath}
          onChange={setField}
          errors={errors.bath}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.toilet}
          label="Санузел"
          name="toilet"
          icon={faSoap}
          options={options.toilet}
          onChange={setField}
          errors={errors.toilet}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__input-group">
        <Checkbox
          value={fields.hasGarbageChute}
          label="Мусоропровод"
          name="hasGarbageChute"
          icon={faTrash}
          onChange={setField}
        />
        <Checkbox value={fields.hasElevator} label="Лифт" name="hasElevator" icon={faElevator} onChange={setField} />
      </div>
      <div className="form__button-group">
        <Button wide style="dotted" text="Назад" action={back} />
        <Button wide style="filled" text="Далее" action={submit} />
      </div>
    </form>
  );
}

export default RoomForm;
