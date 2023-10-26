import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default rootRouter;
