import useFormState from "../../service/use-form-state";
import api from "../../service/api";
import { useNavigate } from "react-router";
import SignupForm from "../../components/form/signup-form";

class SignupFormFields {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
}

class SignupFormErrors {
  name: string[] = [];
  surname: string[] = [];
  email: string[] = [];
  password: string[] = [];
  password_confirmation: string[] = [];
}

function SignupPage() {
  const navigate = useNavigate();
  const signup = useFormState(new SignupFormFields(), new SignupFormErrors());

  async function submit() {
    const response = await api.post("/signup", signup.fields);
    const data = response.data;

    if (response.status === 422 || response.status === 409) {
      signup.setErrors(data.errors);
      return;
    }

    api.get("/csrf");
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_name", data.username);
    localStorage.setItem("image_url", data.imageUrl);
    navigate("/");
  }

  return <SignupForm state={signup} submit={submit} />;
}

export default SignupPage;
