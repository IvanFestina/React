import {UserObjectType} from "./types";

export const followAC = (userID: number) => {
    return {
        type: "FOLLOW",
        userID
    } as const
}

export const unFollowAC = (userID: number) => {
    return {
        type: "UNFOLLOW",
        userID
    } as const
}
export const setUsersAC = (users: UserObjectType[]) => {
    return {
        type: "SET-USERS",
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: "SET-CURRENT-PAGE",
        currentPage
    } as const
}
export const setUsersTotalCountAC = (totalUsersCount: number) => {
    return {
        type: "SET-TOTAL-USERS-COUNT",
        count: totalUsersCount
    } as const
}
export const setToggleIsFetchingAC = (isFetching: boolean) => {
    return {
    type: "TOGGLE-IS-FETCHING", isFetching
    } as const
}
export const setToggleFollowingProgressAC = (isFetching: boolean, userId: number) => {
    return {
    type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userId
    } as const
}
