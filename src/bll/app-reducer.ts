import {
    getAuthUserDataTC,
    setAppErrorAC, SetAppErrorActionType,
    SetAuthUserDataActionType
} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const authInitialState = {
    initialized: false
}

// R E D U C E R

export const appReducer = (state = authInitialState, action: ActionType) => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

//ACTIONS
export const initializedSuccessAC = (initialized: boolean) => ({
    type: 'INITIALIZED-SUCCESS',
    initialized
} as const)


//THUNKS

//типизация thunk dispatch: ThunkDispatch<AppStateType, null (ExtraThunkArg), ActionType>
export const initializeAppTC = () => async (dispatch: ThunkDispatch<AppStateType, null, ActionType>) => {
    try {
        const promise = dispatch(getAuthUserDataTC())
        Promise.all([promise]).then(() => dispatch(initializedSuccessAC(true)))
    } catch (error) {
        dispatch(setAppErrorAC("Initializing Error"))
    }
}

//TYPES
export type InitializedSuccessActionType = ReturnType<typeof initializedSuccessAC>


type ActionType = InitializedSuccessActionType
    | SetAuthUserDataActionType
    | SetAppErrorActionType
