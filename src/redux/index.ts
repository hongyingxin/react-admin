import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import global from "./modules/global";
import user from "./modules/user";
import auth from "./modules/auth";
import tabs from "./modules/tabs";

// 创建并合并 reducer
const reducer = combineReducers({
  global,
  user,
  auth,
  tabs,
});

// 持久化配置
const persistConfig = {
  key: 'redux-state',
  storage,
  blacklist: ["auth"]
}

// 包装 reducer
const persistReducerConfig = persistReducer(persistConfig, reducer);

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // 开启调试
  devTools: true,
});

// 持久化 store
export const persistor = persistStore(store);

// redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();



