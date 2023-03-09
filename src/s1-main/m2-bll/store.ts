import {AnyAction, combineReducers, legacy_createStore} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth-reducer";

import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

// automatically define the type of state
export type AppRootStateType = ReturnType<typeof rootReducer>
// dispatch which allows AC as well as TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// to call store at any moment
// @ts-ignore
window.store = store;
