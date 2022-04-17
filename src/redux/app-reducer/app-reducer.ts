import {Dispatch} from "redux";
import {getAuthUserDataTC, SetAuthUserDataActionType} from "../auth-reducer/auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux-store";

const authInitialState = {
    initialized: false
}

// REDUCER
export const appReducer = (state = authInitialState, action: ActionType) => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state}
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
export const initializeAppTC = () => (dispatch: ThunkDispatch<AppStateType, null, ActionType>) => {
    dispatch(getAuthUserDataTC())
        .then( () => dispatch(initializedSuccessAC(true) )
        )
}

//TYPES
export type InitializedSuccessActionType = ReturnType<typeof initializedSuccessAC>


type ActionType = InitializedSuccessActionType
    | SetAuthUserDataActionType
