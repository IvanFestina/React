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
    data: { userId: number | null, email: string | null, login: string | null, isAuth: boolean },


}
type ActionType = setUserDataACType

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataACType => {
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








