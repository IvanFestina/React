import {InitialStateType, UsersActionType} from "./types";
import {
    followSuccessAC, unfollowSuccessAC,
    setToggleFollowingProgressAC,
    setToggleIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC
} from "./action";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

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
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//ThunckCreator функция, которая может что-то принимать и возвращать Thunk
export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleIsFetchingAC(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => { //axios
                dispatch(setToggleIsFetchingAC(false))
                dispatch(setUsersAC(data.items));
                dispatch(setUsersTotalCountAC(data.totalCount))
            })
    }
}
export const followTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleFollowingProgressAC(true, userId))
        usersAPI.follow(userId)   //axios
            .then(data => {
                console.log(data)
                if (data.resultCode === 0) {
                    dispatch(followSuccessAC(userId));
                }
                dispatch(setToggleFollowingProgressAC(false, userId))
            })
    }
}

export const unFollowTC = (userID: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleFollowingProgressAC(true, userID))
        usersAPI.unfollow(userID)  //axios
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccessAC(userID));
                }
                dispatch(setToggleFollowingProgressAC(false, userID))
            })

    }
}