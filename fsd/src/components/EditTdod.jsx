import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../reducer/AppReducer/action";

const EditTdod = () => {
  const todos = useSelector((state) => state.AppReducer.todos);
  const [editTodos, setEditTodos] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleEdit = () => {
    const params = {
      todo: editTodos,
    };
    dispatch(updateTodo(id, params)).then(() => dispatch(getTodo()));
    navigate("/");
  };

  useEffect(() => {
    if (todos) {
      const currentTodo = todos.find((ele) => ele.id === id);
      if (currentTodo) {
        setEditTodos(currentTodo.todo);
      }
    }
  }, [id, todos]);

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setEditTodos(e.target.value)}
          value={editTodos}
        />
        <button onClick={handleEdit}>update</button>
      </div>
    </>
  );
};

export default EditTdod;
