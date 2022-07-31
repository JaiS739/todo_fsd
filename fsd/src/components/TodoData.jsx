import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodo } from "../reducer/AppReducer/action";
import { useNavigate } from "react-router-dom";
const TodoData = () => {
  const todos = useSelector((state) => state.AppReducer.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).then(() => dispatch(getTodo()));
  };

  useEffect(() => {
    if (todos) {
      dispatch(getTodo());
    }
  }, [dispatch]);

  console.log("todos", todos);

  return (
    <>
      <div>
        {todos.map((ele) => (
          <div key={ele.id}>
            <h3>{ele.todo}</h3>
            <button onClick={() => handleEdit(ele.id)}>edit</button>
            <button onClick={() => handleDelete(ele.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoData;
