import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import { FC, useEffect } from "react";
import ProtectedRoute from "./protected-route";
import NewPlotPage from "./pages/application/plot/new-plot-page";

const RootRouter: FC = () => {
  console.log("im here");
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to={"/houses"} />} />
          <Route path="/houses" element={null} />
          <Route path="/plots">
            <Route path="/plots/new" element={<NewPlotPage />} />
          </Route>
          <Route path="/apartments" element={null} />
          <Route path="/rooms" element={null} />
          <Route path="/clients" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
