import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import { useEffect } from "react";
import ProtectedRoute from "./protected-route";
import ApplicationPage from "./pages/application/application-page/application-page";
import EditablePlotPage from "./pages/application/plot/editable-plot-page";
import EditableHousePage from "./pages/application/house/editable-house-page";
import ApplicationsPage from "./pages/application/house/applications-page";
import { Plot } from "./model/plot";
import { House } from "./model/house";
import { ShortHouse } from "./model/short-application/short-house";
import { ShortPlot } from "./model/short-application/short-plot";

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
            <Route path="/plots" element={<ApplicationsPage<ShortPlot> key="plot" type="plot" />} />
            <Route path="/plots/new" element={<EditablePlotPage willCreate />} />
            <Route path="/plots/:id" element={<ApplicationPage<Plot> />} />
            <Route path="/plots/:id/edit" element={<EditablePlotPage />} />
          </Route>
          <Route path="/houses">
            <Route path="/houses" element={<ApplicationsPage<ShortHouse> key="house" type="house" />} />
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
