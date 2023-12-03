import { useNavigate } from "react-router";
import SignupForm, { SignupFormErrors } from "../../components/form/signup-form";
import { useErrors } from "../../service/use-errors";
import { FormEvent } from "react";
import api from "../../service/api";

function SignupPage() {
  const navigate = useNavigate();
  const errors = useErrors(new SignupFormErrors());

  async function submit(event: FormEvent) {
    event.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/signup", payload);

    if (status === 422 || status == 409) {
      errors.set(data.errors);
      return;
    }

    api.get("/csrf");
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_name", data.username);
    localStorage.setItem("image_url", data.imageUrl);
    navigate("/");
  }

  return <SignupForm submit={submit} errors={errors} />;
}

export default SignupPage;
