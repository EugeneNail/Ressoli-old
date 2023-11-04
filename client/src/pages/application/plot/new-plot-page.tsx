import { FC } from "react";
import "../editable-application-page.sass";
import Button from "../../../components/button/button";
import ClientForm from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";

const NewPlotPage: FC = () => {
  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm back={() => back()} next={() => next()} />,
    <div>Address</div>,
    <div>Plot</div>,
    <div>Contract</div>,
  ]);

  return (
    <div className="editable-application-page">
      <FormProgressBar
        className="editable-application-page__progress-bar"
        steps={steps.length}
        currentStep={currentStep}
        goTo={goTo}
      />
      <div className="form-container">
        <div className="container">{steps[currentStep]}</div>
      </div>
    </div>
  );
};

export default NewPlotPage;
