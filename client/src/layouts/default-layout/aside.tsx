import { FC, useState } from "react";
import AsideLink from "./aside-link";
import {
  faBed,
  faBuilding,
  faHouse,
  faMap,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../service/api";
import { useNavigate } from "react-router";

const Aside: FC = () => {
  const [logoutIcon, setLogoutIcon] = useState(faRightToBracket);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await api.post("/logout");
    if (response.status === 204) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  return (
    <aside className="aside">
      <div className="aside__logo" onClick={() => navigate("/")}>
        <img src="/img/logo.svg" alt="" className="aside__image" />
        <p className="aside__name">Ressoli</p>
      </div>
      <nav className="aside__navigation">
        <AsideLink icon={faHouse} route="/houses" text="Дома" />
        <AsideLink icon={faMap} route="/plots" text="Участки" />
        <AsideLink icon={faBuilding} route="/apartments" text="Квартиры" />
        <AsideLink icon={faBed} route="/rooms" text="Комнаты" />
        <AsideLink icon={faUser} route="/clients" text="Клиенты" />
      </nav>
      <a
        className="aside__logout"
        onMouseOver={() => setLogoutIcon(faRightFromBracket)}
        onMouseLeave={() => setLogoutIcon(faRightToBracket)}
        onClick={logout}
      >
        <FontAwesomeIcon icon={logoutIcon} />
        Выйти
      </a>
    </aside>
  );
};

export default Aside;
