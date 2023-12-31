import React from "react";
import UserList from "./components/UserList";
import CanvasContainer from "./components/three.js/Canvas";

const Home = () => {
  return (
    <div>
      <CanvasContainer />
      <UserList />
    </div>
  );
};

export default Home;
