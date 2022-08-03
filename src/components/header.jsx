import React from "react";
import block from "../img/bloc.png";

const Header = () => {
  return (
    <>
      <header>
        <div className="icon-header">
          <img src={block} alt="bloc" />
        </div>
        <div className="title-header">
          <h1>To Do List!</h1>
        </div>
      </header>
    </>
  );
};
export default Header;
