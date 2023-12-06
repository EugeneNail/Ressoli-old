import { NavLink, useNavigate } from "react-router-dom";
import "./menu.sass";
import { MenuLink } from "./menu-link";
import { StorageUser } from "../../model/storage-user";
import api from "../../service/api";
import { Icon } from "../icon/icon";

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
        </NavLink>
        <div className="menu__links">
          <MenuLink icon="grid_view" text="Dashboard" to="/dashboard" />
          <MenuLink icon="house" text="Houses" to="/houses" />
          <MenuLink icon="map" text="Land Parcels" to="/land-parcels" />
          <MenuLink icon="apartment" text="Apartments" to="/apartments" />
          <MenuLink icon="bed" text="Rooms" to="/rooms" />
        </div>
        <div className="menu__user">
          <div className="menu__icon-container" onClick={logout}>
            <Icon className="menu__logout" name="logout" />
          </div>
          <img src="/img/man-stock.jpg" alt="" className="menu__user-image" />
        </div>
      </nav>
    </aside>
  );
}
