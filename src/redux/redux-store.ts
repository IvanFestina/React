import {combineReducers, createStore, Store} from "redux";
import {profileReducer} from './profileReducer/reducer';
import {dialogsReducer} from './dialogReducer/reducer'
import {sideBarReducer} from "./sidebarReduser/reducer";
import {usersReducer} from "./usersReducer/reducer";
import {authReducer} from "./auth-reducer/auth-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store: Store<RootState, any> = createStore(rootReducer)

// @ts-ignore
window.store = store
