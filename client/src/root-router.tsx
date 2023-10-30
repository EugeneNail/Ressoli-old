import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";

const rootRouter = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/houses",
        element: null,
      },
      {
        path: "/plots",
        element: null,
      },
      {
        path: "/apartments",
        element: null,
      },
      {
        path: "/rooms",
        element: null,
      },
      {
        path: "/clients",
        element: null,
      },
    ],
  },
]);

export default rootRouter;
