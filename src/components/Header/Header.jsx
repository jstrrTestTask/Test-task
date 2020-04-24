import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header_main">
      <h1>New Page</h1>
      <FontAwesomeIcon icon={faHome} />
    </header>
  );
};
