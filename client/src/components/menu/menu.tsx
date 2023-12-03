import { NavLink, useNavigate } from "react-router-dom";
import "./menu.sass";
import { MenuLink } from "./menu-link";
import { MenuUser } from "./menu-user";
import { StorageUser } from "../../model/storage-user";
import api from "../../service/api";

export function Menu() {
  const navigate = useNavigate();

  async function logout() {
    const { status } = await api.post("/logout");
    if (status === 200 || status === 401) {
      const user = new StorageUser();
      user.name = "";
      user.image = "";
      user.token = "";
      navigate("/login");
    }
  }

  return (
    <aside className="menu">
      <nav className="menu__grid">
        <NavLink to="/houses" className="menu__app">
          <img src="/img/logo.png" alt="" className="menu__logo" />
          <p className="menu__name">Ressoli</p>
        </NavLink>
        <div className="menu__links">
          <p className="menu__header">Overview</p>
          <MenuLink icon="grid_view" text="Dashboard" to="/dashboard" />
          <MenuLink icon="house" text="Houses" to="/houses" />
          <MenuLink icon="apartment" text="Apartments" to="/apartments" />
          <MenuLink icon="map" text="Land Parcels" to="/land-parcels" />
          <MenuLink icon="bed" text="Rooms" to="/rooms" />
        </div>
        <MenuUser imgUrl="/img/man-stock.jpg" email="eugene.a.nail@gmail.com" name="Anthony" logout={logout} />
      </nav>
    </aside>
  );
}
