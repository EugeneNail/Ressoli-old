import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import "./spinner.sass";

type SpinnerProps = {
  className?: string;
};

function Spinner({ className }: SpinnerProps) {
  return (
    <div className={classNames("spinner", className)}>
      <FontAwesomeIcon className="spinner__icon" icon={faSpinner} pulse />
      <p className="spinner__text">Загрузка...</p>
    </div>
  );
}

export default Spinner;
