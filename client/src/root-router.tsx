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
          {/* <Route path="/houses">
            <Route path="/houses" element={<ApplicationsPage<ShortHouse> key="house" type="house" />} />
            <Route path="/houses/new" element={<EditableHousePage willCreate />} />
            <Route path="/houses/:id" element={<ApplicationPage<House> />} />
            <Route path="/houses/:id/edit" element={<EditableHousePage />} />
          </Route>
          <Route path="/apartments">
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
