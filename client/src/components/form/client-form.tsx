import { FC } from "react";
import Textbox from "../inputbox/textbox";
import useFormState from "../../service/useFormState";
import Button from "../button/button";
import "./form.sass";
import api from "../../service/api";

class ClientFormFields {
  id: number = 0;
  name: string = "";
  surname: string = "";
  phoneNumber: string = "";
}

class ClientFormErrors {
  name: string = "";
  surname: string = "";
  phoneNumber: string = "";
}

type ClientFormProps = {
  next?: () => void;
  back?: () => void;
};

const ClientForm: FC<ClientFormProps> = (props) => {
  const [fields, errors, { setField, setErrors, clearFieldErrors }] = useFormState(
    new ClientFormFields(),
    new ClientFormErrors()
  );

  const submit = async () => {
    const response = await api.post("/clients", fields);
<<<<<<< HEAD
=======
    console.log(response.data);
>>>>>>> b98ddb62d688320e807cd4d8b67000cba93caf6b
    if (response.status >= 400) {
      setErrors(response.data.errors);
      return;
    }
<<<<<<< HEAD
    fields.id = response.data;
=======
>>>>>>> b98ddb62d688320e807cd4d8b67000cba93caf6b
    props.next?.();
  };

  return (
    <form action="" className="client-form form">
      <h1 className="form__header">Клиент</h1>
      <div className="form__input-group">
        <Textbox name="name" label="Имя" onChange={setField} errors={errors.name} clearErrors={clearFieldErrors} />
        <Textbox
          name="surname"
          label="Фамилия"
          onChange={setField}
          errors={errors.surname}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          name="phoneNumber"
          label="Номер телефона"
          onChange={setField}
          errors={errors.phoneNumber}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__button-group">
        <Button wide type="light" text="Назад" action={() => props.back?.()} />
        <Button wide type="regular" text="Далее" action={submit} />
      </div>
    </form>
  );
};

export default ClientForm;
