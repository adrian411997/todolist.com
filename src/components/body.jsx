import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOne, addList, todoList } from "./../redux/reducers/todoList";
import Header from "./header";

const Body = () => {
  const navigate = useNavigate();
  const [todoItem, setTodoItem] = useState([]);
  const [spanErrorItem, setSpanErrorItem] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const dispatch = useDispatch();
  const [verif, setVerif] = useState("");
  let list = useSelector(todoList);
  const eventsTrigger = (e, index) => {
    const elements = document.getElementById("content-cards").childNodes;
    let length = elements.length < 1 ? 1 + 1 : elements.length - 1;
    if (e.currentTarget.id === elements[length].id) {
      let inputs = document.getElementById("inputs");
      inputs.classList.remove("no-show");
      inputs.classList.add("inputs");
    } else {
      navigate(`/details/${index}`);
    }
  };
  const handleName = (e) => {
    let findName = list.filter((li) => li.nombre === e.target.value.trim());

    if (findName.length > 0) {
      setError("Ya existe una lista con este nombre. Elige otro nombre.");
    } else {
      setError("");
      setNombre(e.target.value);
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
  const handleVerif = (e) => {
    setVerif(e.target.value.trim());
  };
  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      let item = document.getElementById("desc");
      if (item.value !== undefined) {
        let itemDesc = { desc: item.value.trim() };
        setTodoItem((prevState) => [...prevState, itemDesc]);
        document.getElementById("desc").value = "";
        setVerif("");
      }
    }
  };
  const plusItem = (e) => {
    let item = document.getElementById("desc");
    if (item.value !== undefined) {
      let itemDesc = { desc: item.value.trim(), completed: false };
      setTodoItem((prevState) => [...prevState, itemDesc]);
      document.getElementById("desc").value = "";
      setVerif("");
    }
  };
  const deleteItem = (desc) => {
    setTodoItem((prevState) => prevState.filter((pr) => pr.desc !== desc));
  };
  const deleteThis = (name) => {
    dispatch(deleteOne(name));
    window.location.reload();
  };
  const addListItem = () => {
    let listOfItems = {
      nombre: nombre,
      cosasphacer: todoItem,
    };
    dispatch(addList(listOfItems));
    setNombre("");
    setTodoItem([]);
    document.getElementById("nameList").value = "";
  };
  const cancelar = () => {
    let inputs = document.getElementById("inputs");
    inputs.classList.remove("inputs");
    inputs.classList.add("no-show");
    document.getElementById("nameList").value = "";
    document.getElementById("desc").value = "";
    setTodoItem([]);
  };
  return (
    <>
      <Header />
      <div className="content-master">
        <div className="content">
          <div className="content-title">
            <h1>Tus listas de que haceres</h1>
          </div>
          <div className="content-cards" id="content-cards">
            {list.map((li, index) => (
              <div
                id={index}
                className="card"
                onClick={(e) => eventsTrigger(e, index)}
                key={index}
              >
                {li.cosasphacer.length > 0 ? (
                  <div id="closeIcon">
                    <button
                      onClick={() => deleteThis(li.nombre)}
                      className="btn btn-danger btn-circle"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <h3>{li.nombre !== null ? li.nombre : ""}</h3>
                </div>
                {li.cosasphacer.length !== 0 ? (
                  <div>Cosas para hacer: {li.cosasphacer.length}</div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div className="no-show" id="inputs">
            <input
              placeholder="Ingrese nombre de lista"
              id="nameList"
              onChange={handleName}
            />
            <span className="errorInput">{error}</span>
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
                  disabled={spanErrorItem.length > 0}
                  id="btn1"
                  onChange={verifTodoItem}
                  onClick={plusItem}
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
            <span className="errorInput">{spanErrorItem}</span>
            <div className="btn-finish">
              <button
                disabled={nombre.length === 0 || todoItem.length === 0}
                onClick={addListItem}
                className="btn-add"
              >
                Agregar
              </button>
              <button onClick={cancelar} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Body;
