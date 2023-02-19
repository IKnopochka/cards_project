import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {fakeReducer} from "./fake-reducer";

const rootReducer = combineReducers({
    fake: fakeReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// automatically define the type of state
export type AppRootStateType = ReturnType<typeof rootReducer>
// dispatch which allows AC as well as TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// to call store at any moment
// @ts-ignore
window.store = store;
