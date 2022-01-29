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