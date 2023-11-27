import { FormState } from "../../model/form-state";
import Button from "../button/button";
import SelectBox from "../inputbox/selectbox";
import Numberbox from "../inputbox/numberbox";
import {
  faBed,
  faCalendarDays,
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
  faKaaba,
  faWater,
  faTemperatureHigh,
  faCube,
  faCar,
  faTrash,
  faElevator,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../inputbox/checkbox";
import { Apartment } from "../../model/apartment";
import { ApartmentOptions } from "../../model/options/apartment-options";
import { useEffect, useState } from "react";
import api from "../../service/api";

export class ApartmentFormErrors {
  water: string[] = [];
  gas: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  condition: string[] = [];
  walls: string[] = [];
  hotWater: string[] = [];
  heating: string[] = [];
  bath: string[] = [];
  toilet: string[] = [];
  constructionTime: string[] = [];
  loggia: string[] = [];
  balcony: string[] = [];
  area: string[] = [];
  roomCount: string[] = [];
  levelCount: string[] = [];
  level: string[] = [];
  ceiling: string[] = [];
  has_garage: string[] = [];
  has_garbage_chute: string[] = [];
  has_elevator: string[] = [];
  is_corner: string[] = [];
}

type ApartmentFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<Apartment, ApartmentFormErrors>;
};

function ApartmentForm({ back, submit, state: { fields, errors, setField, clearFieldErrors } }: ApartmentFormProps) {
  const [options, setOptions] = useState(new ApartmentOptions());

  useEffect(() => {
    api.get<ApartmentOptions>("/options/apartments").then((response) => setOptions(response.data));
  }, []);

  return (
    <form action="" className="form house-form">
      <h1 className="form__header">Квартира</h1>
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
          value={fields.roomCount}
          label="Комнат в квартире"
          name="roomCount"
          icon={faBed}
          min={1}
          step={1}
          max={100}
          onChange={setField}
          errors={errors.roomCount}
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
          value={fields.constructionTime}
          label="Время постройки"
          name="constructionTime"
          icon={faCalendarDays}
          options={options.constructionTime}
          onChange={setField}
          errors={errors.constructionTime}
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
        <Checkbox value={fields.isCorner} label="Угловая" name="isCorner" icon={faCube} onChange={setField} />
        <Checkbox value={fields.hasBalcony} label="Балкон" name="hasBalcony" icon={faKaaba} onChange={setField} />
        <Checkbox value={fields.hasLoggia} label="Лоджия" name="hasLoggia" icon={faKaaba} onChange={setField} />
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
        <Checkbox value={fields.hasGarage} label="Гараж" name="hasGarage" icon={faCar} onChange={setField} />
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

export default ApartmentForm;
