import {combineReducers, createStore, Store, applyMiddleware} from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from './profileReducer/reducer';
import {dialogsReducer} from './dialogReducer/reducer'
import {sideBarReducer} from "./sidebarReduser/reducer";
import {usersReducer} from "./usersReducer/reducer";
import {authReducer} from "./auth-reducer/auth-reducer";
import thunk from "redux-thunk";

// declare global {
//     interface  Window {
//         _REDUX_DEVTOOLS_EXTENSION_COMPOSE_?: typeof compose
//     }
// }

const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const store: Store<AppStateType> = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducers>

// @ts-ignore
window.store = store
