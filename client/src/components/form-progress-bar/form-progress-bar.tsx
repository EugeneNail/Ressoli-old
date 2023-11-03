import { FC, useState } from "react";
import "./form-progress-bar.sass";
import { width } from "@fortawesome/free-solid-svg-icons/faEnvelope";
type FormProgressBarProps = {
  steps: number;
  currentStep: number;
  goTo: (stepIndex: number) => void;
  className?: string;
};

const FormProgressBar: FC<FormProgressBarProps> = (props) => {
  const difference = 100 / props.steps;
  const width = 100 - difference;
  const left = difference / 2 + "%";
  const widthStep = 100 / props.steps;
  const style = {
    width: widthStep * props.currentStep + "%",
    left: left,
  };

  return (
    <div className={"form-progress-bar" + " " + props.className}>
      <div className="form-progress-bar__top-track" style={style} />
      <div className="form-progress-bar__bottom-track" style={{ width: width + "%", left: left }} />
      {[...Array(props.steps).keys()].map((number, index) => {
        const completedStyle = number <= props.currentStep ? " form-progress-bar__step_completed" : "";
        return (
          <div key={index} onClick={() => props.goTo(number)} className={"form-progress-bar__step" + completedStyle}>
            {number + 1}
          </div>
        );
      })}
    </div>
  );
};

export default FormProgressBar;
