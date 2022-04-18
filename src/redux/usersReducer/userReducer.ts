import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

const initialState = {
    users: [] as UserObjectType[] ,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[]  // в этот массив мы будем помещать id пользователя, которого мы нажимыем fallow/unfollow
    //будем накапливать те процессы, которые идут у нас в таком варианте
    //задача, когда идет подписка - надо id пользователя сюда закидывать, когда идет отписка, важно id отсюда забирать.
}

//REDUCER

export const usersReducer = (state = initialState, action: UsersActionType): InitialStateUserType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
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

//ACTIONS

export const followSuccessAC = (userID: number) => ({type: "FOLLOW", userID} as const)
export const unfollowSuccessAC = (userID: number) => ({type: "UNFOLLOW", userID} as const)
export const setUsersAC = (users: UserObjectType[]) => ({type: "SET-USERS", users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: "SET-CURRENT-PAGE", currentPage} as const)
export const setUsersTotalCountAC = (totalUsersCount: number) => ({
    type: "SET-TOTAL-USERS-COUNT",
    count: totalUsersCount
} as const)
export const setToggleIsFetchingAC = (isFetching: boolean) => ({type: "TOGGLE-IS-FETCHING", isFetching} as const)
export const setToggleFollowingProgressAC = (isFetching: boolean, userId: number) => ({
    type: "TOGGLE-IS-FOLLOWING-PROGRESS",
    isFetching,
    userId
} as const)

//THUNKS

//ThunckCreator функция, которая может что-то принимать и возвращать Thunk
export const getUsersTC = (page: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(page))
        usersAPI.getUsers(page, pageSize)
            .then(response => { //axios
                dispatch(setToggleIsFetchingAC(false))
                dispatch(setUsersAC(response.items));
                dispatch(setUsersTotalCountAC(response.totalCount))
            })
    }
}
export const followTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleFollowingProgressAC(true, userId))
        usersAPI.follow(userId)   //axios
            .then(data => {
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

// TYPES

export type LocationObjectType = {
    city: string
    country: string
}

type Photos = {
    large: string
    small: string
}

export type UserObjectType = {
    id: number
    photos: Photos
    followed: boolean
    name: string
    status: string
    location?: LocationObjectType
}

export type InitialStateUserType = typeof initialState

export type UsersActionType = ReturnType<typeof followSuccessAC>
    | ReturnType<typeof unfollowSuccessAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof setToggleIsFetchingAC>
    | ReturnType<typeof setToggleFollowingProgressAC>

