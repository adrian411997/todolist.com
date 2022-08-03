import React, { useState } from "react";
import Header from "./header";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  todoList,
  changeName,
  restart,
  deleteTodo,
  changeTodoListItem,
  notCompleted,
  completed,
  pushNewItems,
} from "./../redux/reducers/todoList";
import "./details.css";
import { useNavigate, Link } from "react-router-dom";
const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams().id;
  let list = useSelector(todoList);
  const [error, setError] = useState("");
  const [spanErrorItem, setSpanErrorItem] = useState("");
  const [todoItem, setTodoItem] = useState([]);
  const [editar, setEditar] = useState(false);
  const [todoEdit, setTodoEdit] = useState("");
  const [newTodoItem, setNewTodoItem] = useState("");
  const edit = (e) => {
    setEditar(true);
  };
  console.log(todoItem);
  const handleName = (e) => {
    let findName = list.filter((li) => li.nombre === e.target.value.trim());

    if (findName.length > 0) {
      setError("Ya existe una lista con este nombre. Elige otro nombre.");
    } else {
      setError("");
    }
  };
  const onEnterName = (e) => {
    if (e.keyCode === 13) {
      let newName = document.getElementById("newName").value;

      let info = {
        params: params,
        newName: newName,
      };
      dispatch(changeName(info));
      setEditar(false);
    }
  };
  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      let item = document.getElementById("desc");
      if (item.value !== undefined) {
        let itemDesc = { desc: item.value.trim() };
        setTodoItem((prevState) => [...prevState, itemDesc]);
        document.getElementById("desc").value = "";
        item.value = "";
      }
    }
  };
  const verifTodoItem = (e) => {
    let foundItem = todoItem.filter((ti) => ti.desc === e.target.value);
    if (foundItem.length > 0) {
      setSpanErrorItem("Ya hay una tarea con este nombre");
    } else {
      setSpanErrorItem("");
    }
  };
  const checked = (e, index) => {
    if (e.target.checked) {
      let info = { param: params, place: index };
      dispatch(completed(info));
    } else {
      let info = { param: params, place: index };
      dispatch(notCompleted(info));
    }
  };
  const onEnterNameItem = (e, index) => {
    if (e.keyCode === 13) {
      let info = { param: params, place: index, name: newTodoItem };
      dispatch(changeTodoListItem(info));
    }
  };
  const undedit = (e) => {
    setEditar(false);
  };
  const editAction = (e) => {
    let newName = document.getElementById("newName").value;

    let info = {
      params: params,
      newName: newName,
    };
    dispatch(changeName(info));
    setEditar(false);
  };
  const editTodo = (e, index) => {
    setTodoEdit(index);
  };
  const restated = () => {
    dispatch(restart());
    navigate("/");
  };
  const deleteThis = (e, place, name) => {
    let info = {
      param: params,
      place: place,
      name: name,
    };

    dispatch(deleteTodo(info));
  };
  const show = (e) => {
    let inputs = document.getElementById("inputs");
    inputs.classList.remove("no-show");
    inputs.classList.add("inputs");
  };
  const cancelar = (e) => {
    let inputs = document.getElementById("inputs");
    inputs.classList.remove("inputs");
    inputs.classList.add("no-show");

    document.getElementById("desc").value = "";
    setTodoItem([]);
  };
  const editTodoDisabled = (e) => {
    setTodoEdit("");
  };
  const onChange = (e) => {
    setNewTodoItem(e.target.value);
  };
  const editItem = (e, index) => {
    let info = { param: params, place: index, name: newTodoItem };
    dispatch(changeTodoListItem(info));
  };
  const deleteItem = (desc) => {
    setTodoItem((prevState) => prevState.filter((pr) => pr.desc !== desc));
  };
  const pushList = (e) => {
    let newItem = document.getElementById("desc").value;
    document.getElementById("desc").value = "";
    setTodoItem([...todoItem, { desc: newItem, complete: false }]);
  };
  const modifyStatePush = (e) => {
    let info = { newItems: todoItem, params: params };
    console.log(info);
    dispatch(pushNewItems(info));
    setTodoItem([]);
    let inputs = document.getElementById("inputs");
    inputs.classList.remove("inputs");
    inputs.classList.add("no-show");
  };
  return (
    <>
      <Header />
      <div className="details-todo">
        <div className="details-content">
          <div className="details-title">
            {!editar ? (
              <h2>
                {list[params].nombre}{" "}
                <button
                  title="Editar nombre"
                  className="edit-name"
                  onClick={edit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="16"
                    height="19"
                    viewBox="0 0 1280.000000 1280.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M8325 12790 c-27 -4 -70 -9 -95 -9 -25 -1 -66 -11 -93 -24 -50 -24 -25 1 -1457 -1422 -410 -408 -1422 -1413 -2250 -2235 -2242 -2225 -2759 -2742 -2781 -2777 -11 -18 -38 -97 -59 -175 -21 -79 -93 -345 -160 -593 -67 -247 -175 -648 -240 -890 -119 -442 -337 -1244 -370 -1365 -17 -63 -128 -473 -155 -575 -12 -43 -67 -248 -135 -500 -34 -126 -121 -448 -141 -525 -11 -41 -38 -140 -60 -220 -21 -80 -48 -179 -59 -220 -11 -41 -42 -156 -69 -255 -27 -99 -72 -268 -101 -375 -28 -107 -60 -225 -71 -263 -45 -152 -35 -224 40 -298 74 -75 145 -84 298 -41 38 11 106 30 153 42 47 12 117 31 155 41 39 11 257 69 485 129 427 113 528 140 640 170 108 29 874 233 1183 314 137 37 281 75 357 96 118 32 2611 697 2795 745 99 26 194 54 210 62 45 22 153 129 2305 2268 404 402 1410 1401 2235 2220 2090 2074 1879 1860 1900 1924 12 37 15 67 11 100 -4 25 -8 84 -10 131 -3 66 -17 134 -65 305 -34 121 -98 351 -142 510 -44 160 -91 309 -105 332 -25 44 -89 83 -135 83 -70 -1 -105 -32 -674 -599 -308 -306 -1572 -1562 -2810 -2791 -2911 -2889 -2694 -2670 -2733 -2752 -18 -37 -42 -104 -54 -150 -35 -138 -26 -191 100 -643 l110 -390 -72 -73 -72 -73 -900 -240 c-494 -132 -1112 -296 -1373 -365 l-474 -126 -421 419 c-1271 1263 -1656 1649 -1656 1662 0 8 40 163 89 345 49 182 128 473 175 646 46 173 155 576 241 895 86 319 172 636 190 704 l34 124 73 74 c44 44 78 71 87 68 7 -3 193 -53 413 -111 448 -118 491 -124 639 -85 158 41 172 52 544 420 489 484 3206 3182 4095 4066 415 412 975 968 1243 1235 269 267 497 502 508 522 43 84 13 173 -72 216 -25 12 -272 83 -550 157 -518 139 -590 153 -694 135z" />
                      <path d="M10089 11986 c-32 -12 -70 -33 -85 -45 -16 -12 -234 -226 -484 -475 -250 -249 -1485 -1475 -2745 -2725 -3090 -3068 -2946 -2923 -2980 -2996 -34 -72 -40 -179 -13 -231 27 -50 1734 -1742 1776 -1760 57 -24 164 -15 235 22 68 35 -68 -98 1792 1748 4192 4163 4441 4412 4473 4476 37 75 43 180 14 237 -24 47 -1715 1728 -1765 1755 -48 26 -149 23 -218 -6z" />
                    </g>
                  </svg>
                </button>
              </h2>
            ) : (
              <div>
                <input
                  className="input-details"
                  onChange={handleName}
                  id="newName"
                  placeholder="Ingrese nuevo nombre"
                  onKeyDown={onEnterName}
                />
                <button className={"btn-cancel2"} onClick={undedit}>
                  x
                </button>
                <button
                  className="btn-accept"
                  disabled={error.length > 0}
                  onClick={editAction}
                >
                  v
                </button>
              </div>
            )}{" "}
            <span className="errorInput">{error}</span>
          </div>
          <div className="detail-list">
            <ul className="flex-u">
              {list[params].cosasphacer.length > 0 ? (
                list[params].cosasphacer.map((li, index) => (
                  <div className="list-desc-item">
                    <li className="list-moredesc">
                      {todoEdit === li.desc ? (
                        <input
                          placeholder="Ingrese nuevo nombre de tarea"
                          className="input-details"
                          onChange={onChange}
                          onKeyDown={(e) => onEnterNameItem(e, index)}
                          id={`edit${index}`}
                        />
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            id="cbox2"
                            onChange={(e) => checked(e, index)}
                            checked={li.completed === true ? true : false}
                          />{" "}
                          <label for="cbox2" className="desc-underornot">
                            {li.desc}
                          </label>
                        </>
                      )}
                    </li>
                    {todoEdit === li.desc ? (
                      <div className="btn-space">
                        <button
                          className="btn-cancel2"
                          onClick={editTodoDisabled}
                        >
                          x
                        </button>
                        <button
                          className="btn-accept"
                          disabled={newTodoItem.length === 0}
                          onClick={(e) => editItem(e, index)}
                        >
                          v
                        </button>
                      </div>
                    ) : (
                      <div className="closeButton">
                        <button
                          onClick={(e) => deleteThis(e, index, li.desc)}
                          className="btn1"
                          disabled={
                            list[params].cosasphacer.length === 1 ||
                            li.completed === true
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="19"
                            viewBox="0 0 16 19"
                            fill="none"
                          >
                            <path
                              d="M11.681 2.41458C11.7194 2.55015 11.874 2.66 12.0286 2.66H15.0175C15.5603 2.66 16 3.05682 16 3.54666C16 3.95141 15.6996 4.29181 15.2906 4.39869L14.7774 17.1327C14.7358 18.1687 13.7807 19 12.6294 19H3.37062C2.22147 19 1.26424 18.1678 1.22258 17.1327L0.709425 4.39869C0.300438 4.29181 0 3.95141 0 3.54666C0 3.05682 0.439696 2.66 0.982467 2.66H3.97141C4.12602 2.66 4.28173 2.54817 4.31901 2.41458L4.52844 1.65557C4.78831 0.717461 5.80587 0 6.87606 0H9.12388C10.1952 0 11.2116 0.717436 11.4715 1.65557L11.681 2.41458ZM7.29835 6.71337V15.3267C7.29835 15.676 7.61305 15.96 8.00011 15.96C8.38718 15.96 8.70187 15.676 8.70187 15.3267V6.71337C8.70187 6.36405 8.38718 6.08004 8.00011 6.08004C7.61305 6.08004 7.29835 6.36405 7.29835 6.71337ZM4.07025 6.73217L4.35095 15.3455C4.36301 15.6948 4.68648 15.9699 5.07354 15.96C5.46061 15.9491 5.76542 15.6572 5.75448 15.3079L5.47377 6.69458C5.46171 6.34526 5.13824 6.07016 4.75118 6.08004C4.36412 6.09093 4.0593 6.38285 4.07025 6.73217ZM10.5265 6.69457L10.2458 15.3078C10.2348 15.6572 10.5396 15.9491 10.9267 15.96C11.3137 15.9699 11.6372 15.6948 11.6493 15.3454L11.93 6.73216C11.9409 6.38284 11.6361 6.09093 11.249 6.08003C10.862 6.07014 10.5385 6.34525 10.5265 6.69457ZM6.41553 2.66H9.58441C9.66117 2.66 9.70941 2.60558 9.69077 2.53829L9.56467 2.08505C9.5241 1.93661 9.29274 1.77332 9.12388 1.77332H6.87606C6.7072 1.77332 6.47583 1.93661 6.43527 2.08505L6.30917 2.53829C6.29053 2.60657 6.33877 2.66 6.41553 2.66H6.41553Z"
                              fill="#EB5757"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => editTodo(e, li.desc)}
                          disabled={li.completed === true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.0"
                            width="16"
                            height="19"
                            viewBox="0 0 1280.000000 1280.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                              fill="#000000"
                              stroke="none"
                            >
                              <path d="M8325 12790 c-27 -4 -70 -9 -95 -9 -25 -1 -66 -11 -93 -24 -50 -24 -25 1 -1457 -1422 -410 -408 -1422 -1413 -2250 -2235 -2242 -2225 -2759 -2742 -2781 -2777 -11 -18 -38 -97 -59 -175 -21 -79 -93 -345 -160 -593 -67 -247 -175 -648 -240 -890 -119 -442 -337 -1244 -370 -1365 -17 -63 -128 -473 -155 -575 -12 -43 -67 -248 -135 -500 -34 -126 -121 -448 -141 -525 -11 -41 -38 -140 -60 -220 -21 -80 -48 -179 -59 -220 -11 -41 -42 -156 -69 -255 -27 -99 -72 -268 -101 -375 -28 -107 -60 -225 -71 -263 -45 -152 -35 -224 40 -298 74 -75 145 -84 298 -41 38 11 106 30 153 42 47 12 117 31 155 41 39 11 257 69 485 129 427 113 528 140 640 170 108 29 874 233 1183 314 137 37 281 75 357 96 118 32 2611 697 2795 745 99 26 194 54 210 62 45 22 153 129 2305 2268 404 402 1410 1401 2235 2220 2090 2074 1879 1860 1900 1924 12 37 15 67 11 100 -4 25 -8 84 -10 131 -3 66 -17 134 -65 305 -34 121 -98 351 -142 510 -44 160 -91 309 -105 332 -25 44 -89 83 -135 83 -70 -1 -105 -32 -674 -599 -308 -306 -1572 -1562 -2810 -2791 -2911 -2889 -2694 -2670 -2733 -2752 -18 -37 -42 -104 -54 -150 -35 -138 -26 -191 100 -643 l110 -390 -72 -73 -72 -73 -900 -240 c-494 -132 -1112 -296 -1373 -365 l-474 -126 -421 419 c-1271 1263 -1656 1649 -1656 1662 0 8 40 163 89 345 49 182 128 473 175 646 46 173 155 576 241 895 86 319 172 636 190 704 l34 124 73 74 c44 44 78 71 87 68 7 -3 193 -53 413 -111 448 -118 491 -124 639 -85 158 41 172 52 544 420 489 484 3206 3182 4095 4066 415 412 975 968 1243 1235 269 267 497 502 508 522 43 84 13 173 -72 216 -25 12 -272 83 -550 157 -518 139 -590 153 -694 135z" />
                              <path d="M10089 11986 c-32 -12 -70 -33 -85 -45 -16 -12 -234 -226 -484 -475 -250 -249 -1485 -1475 -2745 -2725 -3090 -3068 -2946 -2923 -2980 -2996 -34 -72 -40 -179 -13 -231 27 -50 1734 -1742 1776 -1760 57 -24 164 -15 235 22 68 35 -68 -98 1792 1748 4192 4163 4441 4412 4473 4476 37 75 43 180 14 237 -24 47 -1715 1728 -1765 1755 -48 26 -149 23 -218 -6z" />
                            </g>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h3>No hay tareas que mostrar</h3>
              )}
            </ul>
          </div>
          <div>
            <button onClick={show} className="btn-show">
              Agregar mas tareas
            </button>
          </div>{" "}
          <div className="no-show" id="inputs">
            <div className="list">
              {todoItem.length !== 0
                ? todoItem.map((li) => (
                    <div className="list-desc">
                      <div className="title-desc">
                        <li>{li.desc}</li>
                      </div>

                      <div className="closeButton">
                        <button onClick={() => deleteItem(li.desc)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="19"
                            viewBox="0 0 16 19"
                            fill="none"
                          >
                            <path
                              d="M11.681 2.41458C11.7194 2.55015 11.874 2.66 12.0286 2.66H15.0175C15.5603 2.66 16 3.05682 16 3.54666C16 3.95141 15.6996 4.29181 15.2906 4.39869L14.7774 17.1327C14.7358 18.1687 13.7807 19 12.6294 19H3.37062C2.22147 19 1.26424 18.1678 1.22258 17.1327L0.709425 4.39869C0.300438 4.29181 0 3.95141 0 3.54666C0 3.05682 0.439696 2.66 0.982467 2.66H3.97141C4.12602 2.66 4.28173 2.54817 4.31901 2.41458L4.52844 1.65557C4.78831 0.717461 5.80587 0 6.87606 0H9.12388C10.1952 0 11.2116 0.717436 11.4715 1.65557L11.681 2.41458ZM7.29835 6.71337V15.3267C7.29835 15.676 7.61305 15.96 8.00011 15.96C8.38718 15.96 8.70187 15.676 8.70187 15.3267V6.71337C8.70187 6.36405 8.38718 6.08004 8.00011 6.08004C7.61305 6.08004 7.29835 6.36405 7.29835 6.71337ZM4.07025 6.73217L4.35095 15.3455C4.36301 15.6948 4.68648 15.9699 5.07354 15.96C5.46061 15.9491 5.76542 15.6572 5.75448 15.3079L5.47377 6.69458C5.46171 6.34526 5.13824 6.07016 4.75118 6.08004C4.36412 6.09093 4.0593 6.38285 4.07025 6.73217ZM10.5265 6.69457L10.2458 15.3078C10.2348 15.6572 10.5396 15.9491 10.9267 15.96C11.3137 15.9699 11.6372 15.6948 11.6493 15.3454L11.93 6.73216C11.9409 6.38284 11.6361 6.09093 11.249 6.08003C10.862 6.07014 10.5385 6.34525 10.5265 6.69457ZM6.41553 2.66H9.58441C9.66117 2.66 9.70941 2.60558 9.69077 2.53829L9.56467 2.08505C9.5241 1.93661 9.29274 1.77332 9.12388 1.77332H6.87606C6.7072 1.77332 6.47583 1.93661 6.43527 2.08505L6.30917 2.53829C6.29053 2.60657 6.33877 2.66 6.41553 2.66H6.41553Z"
                              fill="#EB5757"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <span className="errorInput">{spanErrorItem}</span>
            <div className="addItem">
              <div className="inputAddItem">
                <input
                  placeholder="Ingrese una tarea"
                  id="desc"
                  onChange={verifTodoItem}
                  onKeyDown={pressEnter}
                />
              </div>
              <div className="addItemButton">
                <button
                  disabled={
                    spanErrorItem.length > 0 ||
                    document.getElementById("desc").value.length < 1
                  }
                  id="btn1"
                  onClick={pushList}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 50 50"
                    width={20}
                    height={20}
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 50 50"
                  >
                    <rect fill="none" height="50" width="50" />
                    <line
                      fill="#fff"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      x1="9"
                      x2="41"
                      y1="25"
                      y2="25"
                    />
                    <line
                      fill="#fff"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      x1="25"
                      x2="25"
                      y1="9"
                      y2="41"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="btn-finish">
              <button
                disabled={todoItem.length === 0}
                onClick={(e) => modifyStatePush(e)}
                className="btn-add"
              >
                Agregar
              </button>
              <button onClick={cancelar} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
          <Link to="/">
            <button className="btn-back">Volver</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Details;
