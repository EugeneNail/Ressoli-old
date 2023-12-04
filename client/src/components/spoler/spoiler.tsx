import { useState } from "react";
import "./spoiler.sass";
import classNames from "classnames";

type SpoilerProps = {
  open?: boolean;
  children: JSX.Element;
  title: string;
};

export function Spoiler({ open, title, children }: SpoilerProps) {
  const [isClosed, setClosed] = useState(!open);

  return (
    <div className={classNames("spoiler", { closed: isClosed })}>
      <div className="spoiler__head" onClick={() => setClosed(!isClosed)}>
        <p className="spoiler__title">{title}</p>
        <span className="spoiler__chevron material-symbols-rounded">{isClosed ? "expand_more" : "expand_less"}</span>
      </div>
      <div className="spoiler__content">{children}</div>
    </div>
  );
}
