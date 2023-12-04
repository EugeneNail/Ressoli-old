import api from "../../service/api";
import { useNavigate } from "react-router";
import LoginForm, { LoginFormErrors } from "../../components/guest-form/login-form";
import { useErrors } from "../../service/use-errors";
import { StorageUser } from "../../model/storage-user";

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

    const user = new StorageUser();
    user.token = data.userToken;
    user.image = data.userImageUrl;
    user.name = data.userName;
    navigate("/");
  }

  return <LoginForm submit={submit} errors={errors} />;
}

export default LoginPage;
