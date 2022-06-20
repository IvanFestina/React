import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ProfileActionsTypes} from "./profileReducer";

const authInitialState: authInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    captchaUrl: null  // if null, then captcha is not required
}

// R E D U C E R
export const authReducer = (state = authInitialState, action: ActionAuthType): authInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
        case 'GET-CAPTCHA-URL-SUCCESS':
        case 'AUTH/SET-USER-DATA':
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

// A C T I O N S
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'AUTH/SET-USER-DATA',
        payload: {
            userId,
            email,
            login,
            isAuth,
        }
    } as const
}
export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    payload: {error}
} as const)
export const getCaptchaUrlSuccessAC = (captchaUrl: string) => ({
    type: 'GET-CAPTCHA-URL-SUCCESS',
    payload: {captchaUrl}
} as const)


// T H U N K S

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    try {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data //на сервере приходит id, а у нас в action userId
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
        if (response.data.messages && response.data.messages.length > 0) {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (error) {
        dispatch(setAppErrorAC("Some error occurred getting user data"))
    }
    //теперь наш Header знает, что мы авторизованы,
    // нужно эту информацию из data задиспачить в authReducer
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: ThunkDispatch<AppStateType, null, ActionAuthType>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    try {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserDataTC() as any)
        }
        if (response.data.resultCode === 10) {
            await dispatch(getCaptchaUrlTC())
        }
        if (response.data.messages.length) {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (error) {
        dispatch(setAppErrorAC('Some error occurred during authorisation'))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.getCaptcha()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccessAC(captchaUrl))
    } catch (error) {
        setAppErrorAC('Some error occurred related to captcha')
    }
}

// T Y P E S

export type authInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: string | null
    captchaUrl: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>
export type GetCaptchaUrlSuccessActionType = ReturnType<typeof getCaptchaUrlSuccessAC>

export type ActionAuthType = SetAuthUserDataActionType
    | SetAppErrorActionType
    | GetCaptchaUrlSuccessActionType

