import "./form-progress-bar.sass";

type FormProgressBarProps = {
  steps: number;
  currentStep: number;
  goTo: (stepIndex: number) => void;
  className?: string;
};

function FormProgressBar({ steps, currentStep, goTo, className }: FormProgressBarProps) {
  const difference = 100 / steps;
  const width = 100 - difference;
  const left = difference / 2 + "%";
  const widthStep = 100 / steps;
  const style = {
    width: widthStep * currentStep + "%",
    left: left,
  };

  return (
    <div className={`form-progress-bar ${className}`}>
      <div className="form-progress-bar__top-track" style={style} />
      <div className="form-progress-bar__bottom-track" style={{ width: width + "%", left: left }} />
      {[...Array(steps).keys()].map((number, index) => {
        return (
          <div
            key={index}
            onClick={() => goTo(number)}
            className={`form-progress-bar__step ${number <= currentStep ? " form-progress-bar__step_completed" : ""}`}
          >
            {number + 1}
          </div>
        );
      })}
    </div>
  );
}

export default FormProgressBar;
