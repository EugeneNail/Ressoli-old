import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import LoginPage from "./pages/guest/login-page";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import { useEffect } from "react";

function RootRouter() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to={"/houses"} />} />
          <Route path="/houses" element={null} />
          {/* <Route path="/plots">
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
          <Route path="/apartments">
            <Route path="/apartments" element={<ApartmentsPage />} />
            <Route path="/apartments/:id" element={<ApartmentPage />} />
            <Route path="/apartments/new" element={<CreateApartmentPage />} />
            <Route path="/apartments/:id/edit" element={<EditApartmentPage />} />
          </Route>
          <Route path="/rooms">
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomPage />} />
            <Route path="/rooms/new" element={<CreateRoomPage />} />
            <Route path="/rooms/:id/edit" element={<EditRoomPage />} />
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
