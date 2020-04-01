import React from "react";
import Logo from "../logo/logo";
import NavItems from "../navItems/navItems";
import NavAuth from "../navAuth/navAuth.js";

export default ({ isAuthenticated, clicked }) => (
  <header className="header">
    <div className="header__content-wrapper">
      <Logo />
      <NavItems isAuthenticated={isAuthenticated} />
      <NavAuth clicked={clicked} isAuthenticated={isAuthenticated} />
    </div>
  </header>
);
