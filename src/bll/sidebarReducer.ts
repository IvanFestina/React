
const initialState = {
    friends: [
        {
            id: '1',
            name: 'Kate',
            img: 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg'
        },
        {
            id: '2',
            name: 'Alex',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNnnWBcyIHwEjBSRe4e66_YfVmxzrYi1NwQ&usqp=CAU'
        },
        {
            id: '3',
            name: 'Gregory',
            img: 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'
        },
    ]
}

//REDUCER
export const sideBarReducer = (state: InitialStateFriendsType = initialState, action: ActionSideBarReducerType): InitialStateFriendsType => {
    switch (action.type) {

        default: {
            return state
        }
    }
}

//ACTIONS
export type ActionSideBarReducerType = any

//THUNKS

//TYPES
export type InitialStateFriendsType = {
    friends: friends[]
}
export type friends = {
    id: string
    name: string
    img: string
}
