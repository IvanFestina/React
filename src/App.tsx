import React, {Suspense} from 'react';
import './App.css';
import {Sidebar} from "./Components/Navbar/Sidebar";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import UsersContainer from "./Components/Users/UsersContainer";
import {ErrorSnackbar} from "./Components/common/ErrorSnackbar";
import {connect, Provider} from "react-redux";
import {getAuthUserDataTC} from "./redux/auth-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import {Preloader} from "./Components/common/Preloader/Preloader";
import {compose} from "redux";

type AppType = {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
    initialized: boolean
}

type MapDispatchToPropsType = {
    getAuthUserDataTC: () => void
    initializeAppTC: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./Components/Profile/ProfileContainer"))

class App extends React.Component<AppType> {

    componentDidMount() {
        // this.props.getAuthUserDataTC()
        this.props.initializeAppTC()
        //теперь наш App знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                <HeaderContainer/>
                <Sidebar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs'
                               render={() =>
                                   <Suspense fallback={<Preloader/>}>
                                       <DialogsContainer/>
                                   </Suspense>}/>
                        <Route path='/profile/:userId?'
                               render={() =>
                                   <Suspense fallback={<Preloader/>}>
                                       <ProfileContainer/>
                                   </Suspense>}/>
                        <Route path='/news' component={News} />
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
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
        initializeAppTC
    }))(App)

export const MainTSApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

