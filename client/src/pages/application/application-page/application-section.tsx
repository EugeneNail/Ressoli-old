import {
  faUserTie,
  faFileSignature,
  faBuildingUser,
  faCalendarDays,
  faRuble,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationInfo from "../../../components/application-info/application-info";
import { Converter } from "../../../service/converter";
import { Contract } from "../../../model/contract";
import { Client } from "../../../model/client";
import { User } from "../../../model/user";

type ApplicationSectionProps = {
  user: User;
  client: Client;
  contract: Contract;
  date: Date;
};

function ApplicationSection({ user, client, contract, date }: ApplicationSectionProps) {
  return (
    <>
      <h2 className="application-page__subheader">Заявка</h2>
      <section className="application-page__info-group">
        <ApplicationInfo icon={faUserTie} label="Агент" value={`${user.name} ${user.surname}`} />
        <ApplicationInfo icon={faFileSignature} label="Форма договора" value={contract.contract} />
        <ApplicationInfo
          icon={faBuildingUser}
          label="Клиент"
          value={`${client.name} ${client.surname}\n${client.phoneNumber}`}
        />
        <ApplicationInfo icon={faCalendarDays} label="Дата размещения" value={Converter.dateToFull(date)} />
        <ApplicationInfo
          icon={faRuble}
          label="Стоимость"
          value={`${contract.price} ${contract.hasVat ? "с учетом НДС" : ""}`}
        />
        <ApplicationInfo
          icon={faCreditCard}
          label="Ипотека"
          value={contract.hasMortgage ? "Присутствует" : "Отсутствует"}
        />
      </section>
    </>
  );
}

export default ApplicationSection;
