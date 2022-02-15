import {
    followAC,
    setCurrentPageAC, setToggleFollowingProgressAC,
    setToggleIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unFollowAC
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



export type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof setToggleIsFetchingAC>
    | ReturnType<typeof setToggleFollowingProgressAC>

