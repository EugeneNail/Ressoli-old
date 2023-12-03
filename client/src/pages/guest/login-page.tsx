import api from "../../service/api";
import { useNavigate } from "react-router";
import LoginForm, { LoginFormErrors } from "../../components/form/login-form";
import { useErrors } from "../../service/use-errors";

function LoginPage() {
  const navigate = useNavigate();
  const errors = useErrors(new LoginFormErrors());

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/login", payload);

    if (status === 422 || status === 401) {
      errors.set(data.errors);
      return;
    }

    api.get("/csrf");
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_name", data.username);
    localStorage.setItem("image_url", data.imageUrl);
    navigate("/");
  }

  return <LoginForm submit={submit} errors={errors} />;
}

export default LoginPage;
