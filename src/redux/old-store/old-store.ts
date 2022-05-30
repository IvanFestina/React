import React from "react";
// const oldStore: StoreType = {
//     _state: {
//
//         profilePage: {
//             posts: [
//                 {id: '1', message: "Hello, my name's Ivan", likesCount: 5},
//                 {id: '2', message: "I'm fine, thanks", likesCount: 22},
//                 {id: '3', message: "I'm not fine", likesCount: 202},
//             ],
//             textForNewPost: ''
//         },
//         dialogsPage: {
//             messages: [
//                 {
//                     id: '1',
//                     isYou: false,
//                     message: 'Hello',
//                     img: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
//                 },
//                 {
//                     id: '2',
//                     isYou: true,
//                     message: "Hi, I'm Ivan, I have a proposal for you!",
//                     img: 'https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png'
//                 },
//                 {
//                     id: '3',
//                     isYou: false,
//                     message: "Yea? What's up with a proposal?!",
//                     img: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
//                 },
//             ],
//             textForMessageInDialog: '',
//             dialogs: [
//                 {id: '1', name: 'Sergey'},
//                 {id: '2', name: 'Mark'},
//                 {id: '3', name: 'Alexandr'},
//                 {id: '4', name: 'Mike'},
//                 {id: '5', name: 'John'},
//                 {id: '6', name: 'Fill'}
//             ]
//         },
//         sideBar: {
//             friends: [
//                 {
//                     id: '1',
//                     name: 'Kate',
//                     img: 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg'
//                 },
//                 {
//                     id: '2',
//                     name: 'Alex',
//                     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNnnWBcyIHwEjBSRe4e66_YfVmxzrYi1NwQ&usqp=CAU'
//                 },
//                 {
//                     id: '3',
//                     name: 'Gragory',
//                     img: 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'
//                 },
//             ]
//         }
//     },
//     _onChange() {
//         console.log('state has changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this._onChange = observer
//     },
//
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sideBar = sideBarReducer(this._state.sideBar, action);
//         this._onChange()
//
//     }
// }
//
// type dialogObjectType = {
//     id: string;
//     name: string
// }
// type messageObjectType = {
//     id: string;
//     message: string
//     img: string
//     isYou: boolean
// }
// type postsObjectType = {
//     id: string;
//     message: string
//     likesCount: number
// }
// type friendsObjectType = {
//     id: string
//     name: string
//     img: string
// }
// type sideBarType = {
//     friends: Array<friendsObjectType>
// }
// type profilePageType = {
//     posts: Array<postsObjectType>
//     textForNewPost: string
// }
// type dialogsPageType = {
//     messages: Array<messageObjectType>
//     dialogs: Array<dialogObjectType>
//     textForMessageInDialog: string
// }
// type RootStateType = {
//     profilePage: profilePageType
//     dialogsPage: dialogsPageType
//     sideBar: sideBarType
// }
// type ActionsTypes = ReturnType<typeof addPostAC>
//     | ReturnType<typeof updateNewPostTextAC>
//     | ReturnType<typeof addNewMessageAC>
//     | ReturnType<typeof updateNewMessageTextAC>
// type StoreType = {
//     _state: RootStateType
//     _onChange: () => void
//     subscribe: (observer: () => void) => void
//     getState: () => RootStateType
//     dispatch: (action: ActionsTypes) => void
//
// }
//
