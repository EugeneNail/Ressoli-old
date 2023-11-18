import api from "../../service/api";
import useFormState from "../../service/use-form-state";
import { useNavigate } from "react-router";
import LoginForm from "../../components/form/login-form";

class LoginFormFields {
  email: string = "";
  password: string = "";
}

class LoginFormErrors {
  email: string[] = [];
  password: string[] = [];
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useFormState(new LoginFormFields(), new LoginFormErrors());

  async function submit() {
    const response = await api.post("/login", login.fields);
    const data = response.data;

    if (response.status === 422 || response.status === 401) {
      login.setErrors(data.errors);
      return;
    }

    api.get("/csrf");
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_name", data.username);
    localStorage.setItem("image_url", data.imageUrl);
    navigate("/");
  }

  return <LoginForm submit={submit} state={login} />;
}

export default LoginPage;
