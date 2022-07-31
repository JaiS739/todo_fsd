import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "./Todo";
import EditTdod from "./EditTdod";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/:id" element={<EditTdod />} />
      </Routes>
    </>
  );
};

export default MainRoute;
