import {InitialStateType, UsersActionType} from "./types";

const initialState: InitialStateType = {
    users: []
}



export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        }
        case 'UNFOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        }
        case 'SET-USERS': {
            return { ...state, users: [...state.users,...action.users]}
        }
        default:
            return state
    }
}