import { Icon } from "../icon/icon";

export function SaveMark() {
  return (
    <div className="save-mark">
      <Icon className="save-mark__icon" name="check_circle" />
      <p className="save-mark__text">Saved</p>
    </div>
  );
}
