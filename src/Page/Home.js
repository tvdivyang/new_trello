import React from "react";

import Inputs from "./Input";
import Trello from "./Trello";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      {/* <Trello /> */}
      <Link to="/trello">Trello Page</Link>
      <Inputs />
    </>
  );
};

export default Home;
