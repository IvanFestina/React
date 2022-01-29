import {followAC, setUsersAC, unFollowAC} from "./action";

export type LocationObjectType = {
    city: string
    country: string
}

export type UserObjectType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationObjectType
}

export type InitialStateType = {
    users: UserObjectType[]
}


export type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
