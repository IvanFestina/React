

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

const initialState: InitialStateType = {
    users: []
}

export type InitialStateType = {
    users: UserObjectType[]
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

export type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>


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