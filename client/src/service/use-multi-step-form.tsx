import { ReactElement, useState } from "react";

function useMultiStepForm(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function back() {
    setCurrentStep(currentStep > 0 ? currentStep - 1 : currentStep);
  }

  function next() {
    setCurrentStep(currentStep < steps.length - 1 ? currentStep + 1 : currentStep);
  }

  function goTo(index: number) {
    setCurrentStep(index >= 0 && index < steps.length ? index : 0);
  }

  return {
    currentStep,
    back,
    next,
    goTo,
    steps,
  };
}

export default useMultiStepForm;
