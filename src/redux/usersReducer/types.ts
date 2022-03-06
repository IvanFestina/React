import {
    followSuccessAC,
    setCurrentPageAC, setToggleFollowingProgressAC,
    setToggleIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowSuccessAC
} from "./action";

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

export type InitialStateType = {
    users: UserObjectType[],
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}



export type UsersActionType = ReturnType<typeof followSuccessAC>
    | ReturnType<typeof unfollowSuccessAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof setToggleIsFetchingAC>
    | ReturnType<typeof setToggleFollowingProgressAC>

