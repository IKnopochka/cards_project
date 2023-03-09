import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {authAPI, instance, LoginType, UserType} from "../m3-dal/authAPI";
import {passwordAPI} from "../m3-dal/passwordAPI";
import {setAppError, setAppStatus, setInitialized} from "./app-reducer";

const initialState = {
    isLoggedIn: false,
    profile: {} as UserType
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData(state, action: PayloadAction<{ data: UserType }>) {
            state.profile = action.payload.data
        },
        changeName(state, action: PayloadAction<{ name: string }>) {
            state.profile.name = action.payload.name
        },
        changeAvatar(state, action: PayloadAction<{ avatar: string }>) {
            state.profile.avatar = action.payload.avatar
        },
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

//action creators
export const {setAuthUserData, changeName, changeAvatar, setIsLoggedIn} = slice.actions

//thunk
export const register = (data: LoginType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.register(data)
        //отправить данные response.data в профайл
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}
export const login = (data: LoginType) => async (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.login(data)
        console.log(response)
        dispatch(setIsLoggedIn({value: true}))

        dispatch(setAuthUserData(response))
        //отправить данные response.data в профайл
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.logout()
        dispatch(setIsLoggedIn({value: false}))
        //отправить данные response.data в профайл
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}

//thunk creators
export const getIsAuthUser = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.authMe()
        if (result.data) {
            dispatch(setAuthUserData({data: result.data}))
        }
        dispatch(setIsLoggedIn({value: true}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
        // if (axios.isAxiosError(err)) {
        //     const error = err.response?.data ? err.response.data.error : err.message
        //     //dispatch(setError(error))
        // } else {
        //     //dispatch(setError(`Native error ${err.message}`))
        // }
    } finally {
        dispatch(setInitialized({value: true}))
    }
}
export const changeProfileName = (name: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.changeName(name)
        dispatch(changeName({name}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}
export const changeProfileImage = (avatar: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.changeImage(avatar)
        dispatch(changeAvatar({avatar}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}

export const sendNewToken = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await passwordAPI.sendToken(email)
        if (res.data.error) {
            //dispath(status successful)
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}

export const getNewToken = (password: string, resetPasswordToken: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await passwordAPI.getToken(password, resetPasswordToken)
        if (res.data.error) {
            //dispath(status successful)
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError({error}))
            dispatch(setAppStatus({status: 'failed'}))
        }
    }
}

//types
type InitialStateType = typeof initialState
