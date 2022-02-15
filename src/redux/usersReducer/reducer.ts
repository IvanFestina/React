import {InitialStateType, UsersActionType} from "./types";

const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []  // в этот массив мы будем помещать id пользователя, которого мы нажимыем fallow/unfollow
    //будем накапливать те процессы, которые идут у нас в таком варианте
    //задача, когда идет подписка - надо id пользователя сюда закидывать, когда идет отписка, важно id отсюда забирать.
}


export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        case 'SET-USERS':
            return {...state, users: action.users}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.count}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":  //мы будем получать id пользователя и значение fetching
            return {...state,
            followingInProgress: action.isFetching
            ? [...state.followingInProgress, action.userId]
            : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}