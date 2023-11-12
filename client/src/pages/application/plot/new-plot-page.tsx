import { FC } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors, ClientFormFields } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors, AddressFormFields } from "../../../components/form/address-form";
import useFormState from "../../../service/use-form-state";

const NewPlotPage: FC = () => {
  const client = useFormState(new ClientFormFields(), new ClientFormErrors());
  const address = useFormState(new AddressFormFields(), new AddressFormErrors());

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm back={() => back()} next={() => next()} state={client} />,
    <AddressForm back={() => back()} next={() => next()} state={address} />,
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
