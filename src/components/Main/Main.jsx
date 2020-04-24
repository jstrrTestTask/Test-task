import React from "react";
import { SearchSelect } from "../SearchSelect/SearchSelect";
import { Button } from "../Button/Button";
import { buyerOptions, carTitles } from "../../utils/data";
import "./Main.scss";

export const Main = () => {
  return (
    <main className="main_container">
      <SearchSelect
        className="item_main"
        items={buyerOptions}
        searchable
        placeholder="Select Buyer"
      />
      <SearchSelect
        className="item_main"
        items={carTitles}
        withAvatar
        placeholder="Car Title"
        dropdownHeading="All users"
      />
      <input type="text" className="item_main" placeholder="Text field" />
      <input type="text" className="item_main " placeholder="Text field" />
      <Button className="outlined">Reset</Button>
      <Button className="contained">Filter</Button>
    </main>
  );
};
