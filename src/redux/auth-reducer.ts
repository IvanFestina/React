import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const authInitialState: authInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
}

// R E D U C E R
export const authReducer = (state = authInitialState, action: ActionAuthType): authInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-USER-DATA':
            return {
                ...state, ...action.payload
            }
        case 'APP/SET-ERROR':
            return {
                ...state, error: action.error
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
    error
} as const)

// T H U N K S
export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data //на сервере приходит id, а у нас в action userId
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
    //теперь наш Header знает, что мы авторизованы,
    // нужно эту информацию из data задиспачить в authReducer
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)
    try {
        if (response.resultCode === 0) {
            dispatch(getAuthUserDataTC() as any)
        }
        if (response.messages.length) {
            dispatch(setAppErrorAC(response.messages[0]))
        }
    } catch (error) {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.logout()
    if (response.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

// T Y P E S

export type authInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>

export type ActionAuthType = SetAuthUserDataActionType
    | SetAppErrorActionType
