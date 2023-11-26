import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import { useEffect } from "react";
import ProtectedRoute from "./protected-route";
import PlotsPage from "./pages/application/plot/plots-page";
import ApplicationPage from "./pages/application/application-page/application-page";
import EditablePlotPage from "./pages/application/plot/editable-plot-page";
import EditableHousePage from "./pages/application/house/editable-house-page";
import HousesPage from "./pages/application/house/houses-page";
import { Plot } from "./model/plot";
import { House } from "./model/house";

function RootRouter() {
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
            <Route path="/plots" element={<PlotsPage />} />
            <Route path="/plots/new" element={<EditablePlotPage willCreate />} />
            <Route path="/plots/:id" element={<ApplicationPage<Plot> />} />
            <Route path="/plots/:id/edit" element={<EditablePlotPage />} />
          </Route>
          <Route path="/houses">
            <Route path="/houses" element={<HousesPage />} />
            <Route path="/houses/new" element={<EditableHousePage willCreate />} />
            <Route path="/houses/:id" element={<ApplicationPage<House> />} />
            <Route path="/houses/:id/edit" element={<EditableHousePage />} />
          </Route>
          <Route path="/apartments" element={null} />
          <Route path="/rooms" element={null} />
          <Route path="/clients" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
