import { FC } from "react";
import "./default-layout.sass";
import { Outlet } from "react-router";
import Textbox from "../../components/inputbox/textbox";
import { faBell, faComment, faEarDeaf, faRing, faSearch } from "@fortawesome/free-solid-svg-icons";
import useFormState from "../../service/useFormState";
import Button from "../../components/button/button";

class SearchFormFields {
  search: string = "";
}

const DefaultLayout: FC = () => {
  const [fields, { setField }] = useFormState(new SearchFormFields(), {});

  return (
    <div className="default-layout">
      <header className="header">
        <a className="header__logo-wrapper">
          <img src="./img/logo.svg" alt="" className="header__logo" />
          <p className="header__name">Ressoli</p>
        </a>
        <div className="header__main-wrapper">
          <form action="" className="header__search">
            <Textbox leadingIcon={faSearch} label="Поиск..." onChange={setField} name="search" />
          </form>
          <div className="header__interaction-group">
            <Button type="light" iconOnly leadingIcon={faComment} action={console.log} />
            <Button type="light" iconOnly leadingIcon={faBell} action={console.log} />
          </div>
          <div className="header__user"></div>
        </div>
      </header>
      <aside className="aside"></aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
