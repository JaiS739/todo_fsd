import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, getTodo } from "../reducer/AppReducer/action";
const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef();

  const dispatch = useDispatch();

  const handleAdd = () => {
    const params = {
      id: uuid(),
      todo: todo,
      status: false,
    };

    dispatch(addTodo(params)).then(() => dispatch(getTodo()));
    setTodo("");
    inputRef.current.focus();
  };

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          ref={inputRef}
        />
        <button onClick={handleAdd}>add</button>
      </div>
    </>
  );
};

export default TodoInput;
