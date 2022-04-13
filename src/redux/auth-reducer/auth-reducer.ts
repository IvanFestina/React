import {Dispatch} from "redux";
import {authAPI} from "../../api/api";

const authInitialState: authInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
}

// REDUCER
export const authReducer = (state = authInitialState, action: ActionAuthType): authInitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
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


//ACTIONS
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {
            userId,
            email,
            login,
            isAuth,
        }
    } as const
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

//THUNKS
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(response => {  //axios
            if (response.resultCode === 0) {
                console.log('auth success')
                let {id, email, login} = response.data //на сервере приходит id, а у нас в action userId
                dispatch(setAuthUserDataAC(id, email, login, true))
            }
        })
    //теперь наш Header знает, что мы авторизованы,
    // нужно эту информацию из data задиспачить в authReducer
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserDataTC() as any)
            }
            if (response.messages.length) {
                dispatch(setAppErrorAC(response.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}


//TYPES


export type authInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: string | null

}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type ActionAuthType = ReturnType<typeof setAuthUserDataAC>
    | SetAppErrorActionType
