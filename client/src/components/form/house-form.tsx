import { FormState } from "../../model/form-state";
import Button from "../button/button";
import SelectBox from "../inputbox/selectbox";
import Numberbox from "../inputbox/numberbox";
import {
  faArrowsUpDown,
  faBed,
  faBolt,
  faCalendarDays,
  faCar,
  faDroplet,
  faFire,
  faHouseCrack,
  faLayerGroup,
  faMaximize,
  faPeopleRoof,
  faShower,
  faSoap,
  faTemperatureHigh,
  faToilet,
  faWarehouse,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { House } from "../../model/house";
import { HouseOptions } from "../../model/options/house-options";
import Checkbox from "../inputbox/checkbox";
import { useEffect, useState } from "react";
import api from "../../service/api";

export class HouseFormErrors {
  water: string[] = [];
  gas: string[] = [];
  area: string[] = [];
  electricity: string[] = [];
  sewer: string[] = [];
  walls: string[] = [];
  hotWater: string[] = [];
  condition: string[] = [];
  heating: string[] = [];
  levelCount: string[] = [];
  bath: string[] = [];
  ceiling: string[] = [];
  toilet: string[] = [];
  roomCount: string[] = [];
  hasGarage: string[] = [];
  constructionTime: string[] = [];
  roof: string[] = [];
  landArea: string[] = [];
}

type HouseFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<House, HouseFormErrors>;
};

function HouseForm({ back, submit, state: { fields, errors, setField, clearFieldErrors } }: HouseFormProps) {
  const [options, setOptions] = useState(new HouseOptions());

  useEffect(() => {
    api.get("/options/house").then((response) => setOptions(response.data));
  }, []);

  return (
    <form className="form house-form">
      <h1 className="form__header">Дом</h1>
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
          value={fields.electricity}
          label="Электричество"
          name="electricity"
          icon={faBolt}
          options={options.electricity}
          onChange={setField}
          errors={errors.electricity}
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
      </div>
      <div className="form__input-group">
        <Numberbox
          value={fields.levelCount}
          label="Этажей в доме"
          name="levelCount"
          min={1}
          step={1}
          max={100}
          icon={faLayerGroup}
          onChange={setField}
          errors={errors.levelCount}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.ceiling}
          label="Высота потолков"
          name="ceiling"
          min={1}
          step={0.01}
          max={5}
          precision={2}
          icon={faArrowsUpDown}
          onChange={setField}
          errors={errors.ceiling}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.roomCount}
          label="Комнат в доме"
          name="roomCount"
          min={1}
          max={100}
          step={1}
          icon={faBed}
          onChange={setField}
          errors={errors.roomCount}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.area}
          label="Площадь дома"
          name="area"
          min={1}
          step={0.05}
          max={10000}
          precision={2}
          icon={faMaximize}
          onChange={setField}
          errors={errors.area}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.landArea}
          label="Площадь участка"
          name="landArea"
          min={0}
          step={1}
          max={10000}
          icon={faMaximize}
          onChange={setField}
          errors={errors.landArea}
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
          value={fields.roof}
          label="Крыша"
          name="roof"
          icon={faPeopleRoof}
          options={options.roof}
          onChange={setField}
          errors={errors.roof}
          clearErrors={clearFieldErrors}
        />
        <SelectBox
          value={fields.walls}
          label="Стены"
          name="walls"
          icon={faWarehouse}
          options={options.walls}
          onChange={setField}
          errors={errors.walls}
          clearErrors={clearFieldErrors}
        />
      </div>

      <div className="form__input-group">
        <SelectBox
          value={fields.hotWater}
          label="Горячая вода"
          name="hotWater"
          icon={faWater}
          options={options.hotWater}
          onChange={setField}
          errors={errors.hotWater}
          clearErrors={clearFieldErrors}
        />

        <SelectBox
          value={fields.heating}
          label="Отопление"
          name="heating"
          icon={faTemperatureHigh}
          options={options.heating}
          onChange={setField}
          errors={errors.heating}
          clearErrors={clearFieldErrors}
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

        <Checkbox value={fields.hasGarage} label="Гараж" name="hasGarage" icon={faCar} onChange={setField} />
      </div>
      <div className="form__button-group">
        <Button wide style="dotted" text="Назад" action={back} />
        <Button wide style="filled" text="Далее" action={submit} />
      </div>
    </form>
  );
}

export default HouseForm;
