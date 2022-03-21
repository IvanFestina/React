import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../../api/api";

const authInitialState: authInitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type authInitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean

}

export const authReducer = (state = authInitialState, action: ActionType): authInitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state, ...action.data, isAuth: true
            }
        default:
            return state
    }
}

type setUserDataACType = {
    type: 'SET-USER-DATA'
    data: { userId: number | null, email: string | null, login: string | null, isAuth?: boolean },
}

type ActionType = setUserDataACType

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth?: boolean): setUserDataACType => {
    return {
        type: 'SET-USER-DATA',
        data: {
            userId,
            email,
            login,
            isAuth,
        }
    }
}

export const setAuthUserDataTC = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(response => {  //axios
            if (response.resultCode === 0) {
                let {id, email, login} = response.data //на сервере приходит id, а у нас в action userId
                dispatch(setAuthUserDataAC(id, email, login))
            }
        })
    //теперь наш Header знает, что мы авторизованы,
    // нужно эту информацию из data задиспачить в authReducer
}






