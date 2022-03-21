import {combineReducers, createStore, Store, applyMiddleware} from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from './profileReducer/profileReducer';
import {dialogsReducer} from './dialogReducer/dialogReducer'
import {sideBarReducer} from "./sidebarReduser/sidebarReducer";
import {usersReducer} from "./usersReducer/userReducer";
import {authReducer} from "./auth-reducer/auth-reducer";
import thunk from "redux-thunk";

// declare global {
//     interface  Window {
//         _REDUX_DEVTOOLS_EXTENSION_COMPOSE_?: typeof compose
//     }
// }

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const store: Store<AppStateType> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
