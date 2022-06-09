import React, {Suspense} from 'react';
import './App.css';
import {Sidebar} from "./Components/Navbar/Sidebar";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import UsersContainer from "./Components/Users/UsersContainer";
import {ErrorSnackbar} from "./Components/common/ErrorSnackbar";
import {connect, Provider} from "react-redux";
import {getAuthUserDataTC, setAppErrorAC} from "./redux/auth-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import {compose} from "redux";
import LinearProgress from "@mui/material/LinearProgress";
import {Error404Page} from "./Components/Error404/Error404Page";

type AppType = {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
    initialized: boolean
}

type MapDispatchToPropsType = {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
    setAppErrorAC: (error: string) => void
}
type MapStateToPropsType = {
    initialized: boolean
}

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))

class App extends React.Component<AppType> {
    // catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    //     setAppErrorAC("some error occurred")
    // }
    componentDidMount() {
        this.props.initializeAppTC()
        //теперь наш App знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer

        // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    // componentWillUnmount() {
    //      window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    //
    // }

    render() {
        if (!this.props.initialized) {
            return <LinearProgress/>
        }
        return (
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                <HeaderContainer/>
                <Sidebar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs'
                               render={() =>
                                   <Suspense fallback={<LinearProgress/>}>
                                       <DialogsContainer/>
                                   </Suspense>}/>
                        <Route path='/profile/:userId?'
                               render={() =>
                                   <Suspense fallback={<LinearProgress/>}>
                                       <ProfileContainer/>
                                   </Suspense>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <Error404Page/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        getAuthUserDataTC,
        initializeAppTC,
        setAppErrorAC
    }))(App)

export const MainTSApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

