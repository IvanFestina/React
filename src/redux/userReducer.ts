import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const initialState = {
    users: [] as UserObjectType[],
    pageSize: 10,
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
        case 'FOLLOW-UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {
                    ...u,
                    followed: action.isFollowing
                } : u)
            }
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
export const followUnfollowAC = (userID: number, isFollowing: boolean) => ({
    type: "FOLLOW-UNFOLLOW",
    userID, isFollowing
} as const)
export const setUsersAC = (users: UserObjectType[]) => ({
    type: "SET-USERS",
    users
} as const)
export const setCurrentPageAC = (currentPage: number) => ({
    type: "SET-CURRENT-PAGE",
    currentPage
} as const)
export const setUsersTotalCountAC = (totalUsersCount: number) => ({
    type: "SET-TOTAL-USERS-COUNT",
    count: totalUsersCount
} as const)
export const setToggleIsFetchingAC = (isFetching: boolean) => ({
    type: "TOGGLE-IS-FETCHING",
    isFetching
} as const)
export const setToggleFollowingProgressAC = (isFetching: boolean, userId: number) => ({
    type: "TOGGLE-IS-FOLLOWING-PROGRESS",
    isFetching,
    userId
} as const)

//THUNKS

//ThunckCreator функция, которая может что-то принимать и возвращать Thunk
export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(setToggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(page))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(setToggleIsFetchingAC(false))
    dispatch(setUsersAC(response.data.items));
    dispatch(setUsersTotalCountAC(response.data.totalCount))
}

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setToggleFollowingProgressAC(true, userId))
    const data = await usersAPI.follow(userId)   //axios
    if (data.data.resultCode === 0) {
        dispatch(followUnfollowAC(userId, true));
    }
    dispatch(setToggleFollowingProgressAC(false, userId))
}

export const unFollowTC = (userID: number) => async (dispatch: Dispatch) => {
    dispatch(setToggleFollowingProgressAC(true, userID))
    const data = await usersAPI.unfollow(userID)  //axios
    if (data.data.resultCode === 0) {
        dispatch(followUnfollowAC(userID, false));
    }
    dispatch(setToggleFollowingProgressAC(false, userID))
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

export type UsersActionType = ReturnType<typeof followUnfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof setToggleIsFetchingAC>
    | ReturnType<typeof setToggleFollowingProgressAC>

