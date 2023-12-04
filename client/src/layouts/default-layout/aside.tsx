import { useState } from "react";
import AsideLink from "./aside-link";

import api from "../../service/api";
import { useNavigate } from "react-router";

function Aside() {
  const navigate = useNavigate();

  async function logout() {
    const response = await api.post("/logout");

    if (response.status === 204) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  }

  return (
    <aside className="aside">
      <div className="aside__logo" onClick={() => navigate("/")}>
        <img src="/img/logo.svg" alt="" className="aside__image" />
        <p className="aside__name">Ressoli</p>
      </div>
    </aside>
  );
}

export default Aside;
