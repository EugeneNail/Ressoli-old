import { FC } from "react";
import Button from "../../components/button/button";
import Textbox from "../../components/inputbox/textbox";
import { faBell, faComment, faSearch } from "@fortawesome/free-solid-svg-icons";
import useFormState from "../../service/useFormState";

class SearchFormFields {
  search: string = "";
}

const Header: FC = () => {
  const [fields, { setField }] = useFormState(new SearchFormFields(), {});

  return (
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
        <div className="header__user">
          <img src="./img/man-stock.jpg" alt="" className="header__user-img" />
        </div>
      </div>
    </header>
  );
};

export default Header;
