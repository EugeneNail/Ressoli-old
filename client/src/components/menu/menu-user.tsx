import { Icon } from "../icon/icon";
import "./menu.sass";

type MenuUserProps = {
  name: string;
  imgUrl: string;
  email: string;
  logout: () => void;
};

export function MenuUser({ name, imgUrl, email, logout }: MenuUserProps) {
  return (
    <div className="menu-user">
      <img src={imgUrl} alt="" className="menu-user__image" />
      <p className="menu-user__name">{name}</p>
      <p className="menu-user__email">{email}</p>
      <Icon className="menu-user__logout" name="logout" onClick={logout} />
    </div>
  );
}
