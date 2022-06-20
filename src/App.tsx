import React, {Suspense} from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import HeaderContainer from "./Components/Header/HeaderContainer";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import UsersContainer from "./Components/Users/UsersContainer";
import {ErrorSnackbar} from "./Components/common/ErrorSnackbar";
import {connect, Provider} from "react-redux";
import {getAuthUserDataTC, setAppErrorAC} from "./bll/auth-reducer";
import {AppStateType, store} from "./bll/redux-store";
import {initializeAppTC} from "./bll/app-reducer";
import {compose} from "redux";
import LinearProgress from "@mui/material/LinearProgress";
import {Error404Page} from "./Components/Error404/Error404Page";
import Grid from '@mui/material/Grid';

type AppType = MapStateToPropsType & {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
}

type MapDispatchToPropsType = {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
    setAppErrorAC: (error: string) => void
}
type MapStateToPropsType = {
    initialized: boolean
    isAuth: boolean
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
            <div>
                <Grid container>
                    <ErrorSnackbar/>
                    {this.props.isAuth && <Grid item xs={12}><HeaderContainer/></Grid>}
                    {this.props.isAuth && <Grid item xs={3}><Navbar/></Grid>}
                    <Grid item xs={9} className='core'>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={'/login'}/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
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
                            <Route path='*' render={() => <Error404Page/>}/>
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
            ;
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
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

