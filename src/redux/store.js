import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import todoListSlice from "./reducers/todoList";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", version: 1, storage };
const persistedReducer = persistReducer(persistConfig, todoListSlice);

export const store = configureStore({
  reducer: { todoList: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
