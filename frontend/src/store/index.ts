import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { UserState } from "../types/user";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  })

// const saveToLocalStorage = (state: any) => {
//   try {
//     localStorage.setItem("state", JSON.stringify(state));
//   } catch (e) {
//     console.error(e);
//   }
// };

// const loadFromLocalStorage = ():any => {
//   try {
//     const stateStr = localStorage.getItem("state");
//     return stateStr ? JSON.parse(stateStr) : undefined;
//   } catch (e) {
//     console.error(e);
//     return undefined;
//   }
// };

// export const store = createStore(rootReducer, loadFromLocalStorage)

// // const persistedStore = loadFromLocalStorage();
// // export const store = configureStore(rootReducer);

// store.subscribe(() => {
//   saveToLocalStorage(store.getState());
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);
