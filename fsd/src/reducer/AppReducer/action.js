import * as types from "./actionTypes";
import axios from "axios";

const getTodo = () => (dispatch) => {
  dispatch({ type: types.GET_TODO_REQUEST });

  return axios
    .get("http://localhost:5000/")
    .then((r) => dispatch({ type: types.GET_TODO_SUCCESS, payload: r.data }))
    .catch((e) => {
      dispatch({ type: types.GET_TODO_FAILURE });
    });
};

const addTodo = (params) => (dispatch) => {
  dispatch({ type: types.ADD_TODO_REQUEST });
  return axios
    .post("http://localhost:5000/", params)
    .then((r) => {
      dispatch({ type: types.ADD_TODO_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.ADD_TODO_FAILURE });
    });
};

const updateTodo = (id, params) => (dispatch) => {
  dispatch({ type: types.UPDATE_TODO_REQUEST });
  return axios
    .put(`http://localhost:5000/${id}`, params)
    .then((r) => {
      dispatch({ type: types.UPDATE_TODO_SUCCESS, payload: r.data });
    })
    .then((e) =>
      dispatch((e) => dispatch({ type: types.UPDATE_TODO_FAILURE }))
    );
};

const deleteTodo = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TODO_REQUEST });
  return axios
    .delete(`http://localhost:5000/${id}`)
    .then((r) => dispatch({ type: types.DELETE_TODO_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: types.DELETE_TODO_FAILURE }));
};

export { getTodo, updateTodo, addTodo, deleteTodo };
