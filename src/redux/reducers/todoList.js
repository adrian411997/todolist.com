import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [
    {
      nombre: "Cree una lista de deberes",
      cosasphacer: [],
    },
  ],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addList: (state, list) => {
      let newList = state.todoList.unshift(list.payload);
    },
    restart: (state) => {
      state.todoList = [
        {
          nombre: "Cree una lista de deberes",
          cosasphacer: [],
        },
      ];
    },
    deleteOne: (state, name) => {
      let newList = state.todoList.filter((tl) => tl.nombre !== name.payload);
      state.todoList = newList;
    },
    changeName: (state, info) => {
      state.todoList[info.payload.params].nombre = info.payload.newName;
    },
    deleteTodo: (state, info) => {
      console.log(info.payload.name);

      let array = state.todoList[info.payload.param].cosasphacer.filter(
        (csh) => csh.desc !== info.payload.name
      );
      state.todoList[info.payload.param].cosasphacer = array;
    },
    changeTodoListItem: (state, info) => {
      state.todoList[info.payload.param].cosasphacer[info.payload.place].desc =
        info.payload.name;
    },
    completed: (state, info) => {
      state.todoList[info.payload.param].cosasphacer[
        info.payload.place
      ].completed = true;
    },
    notCompleted: (state, info) => {
      state.todoList[info.payload.param].cosasphacer[
        info.payload.place
      ].completed = false;
    },
    pushNewItems: (state, info) => {
      info.payload.newItems.forEach((arr) =>
        state.todoList[info.payload.params].cosasphacer.push(arr)
      );
    },
  },
});
export const {
  addList,
  restart,
  deleteOne,
  changeName,
  deleteTodo,
  changeTodoListItem,
  completed,
  notCompleted,
  pushNewItems,
} = todoListSlice.actions;

export default todoListSlice.reducer;

export const todoList = (state) => state.todoList.todoList;
