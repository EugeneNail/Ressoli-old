import { useNavigate } from "react-router";
import SignupForm, { SignupFormErrors } from "../../components/form/signup-form";
import { useErrors } from "../../service/use-errors";
import { FormEvent } from "react";
import api from "../../service/api";
import { StorageUser } from "../../model/storage-user";

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

    const user = new StorageUser();
    user.token = data.userToken;
    user.image = data.userImageUrl;
    user.name = data.userName;
    navigate("/");
  }

  return <SignupForm submit={submit} errors={errors} />;
}

export default SignupPage;
