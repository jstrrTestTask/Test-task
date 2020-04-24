import React from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import "./App.scss";

export const App = function () {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};
