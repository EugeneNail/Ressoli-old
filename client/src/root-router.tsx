import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import { useEffect } from "react";
import ProtectedRoute from "./protected-route";
import PlotPage from "./pages/application/plot/plot-page";
import CreatePlotPage from "./pages/application/plot/create-plot-page";
import PlotsPage from "./pages/application/plot/plots-page";
import EditPlotPage from "./pages/application/plot/edit-plot-page";
import CreateHousePage from "./pages/application/house/create-house-page";
import HousesPage from "./pages/application/house/houses-page";
import HousePage from "./pages/application/house/house-page";
import EditHousePage from "./pages/application/house/edit-house-page";

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
            <Route path="/plots/new" element={<CreatePlotPage />} />
            <Route path="/plots/:id" element={<PlotPage />} />
            <Route path="/plots/:id/edit" element={<EditPlotPage />} />
          </Route>
          <Route path="/houses">
            <Route path="/houses" element={<HousesPage />} />
            <Route path="/houses/new" element={<CreateHousePage />} />
            <Route path="/houses/:id" element={<HousePage />} />
            <Route path="/houses/:id/edit" element={<EditHousePage />} />
          </Route>
          {/* <Route path="/apartments">
            <Route path="/apartments" element={<ApplicationsPage<ShortApartment> key="apartment" type="apartment" />} />
            <Route path="/apartments/new" element={<EditableApartmentPage willCreate />} />
            <Route path="/apartments/:id" element={<ApplicationPage<Apartment> />} />
            <Route path="/apartments/:id/edit" element={<EditableApartmentPage />} />
          </Route> */}
          <Route path="/apartments" element={null} />
          <Route path="/rooms" element={null} />
          <Route path="/clients" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
