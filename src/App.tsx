import React from 'react';
import './App.css';
import {Sidebar} from "./Components/Navbar/Sidebar";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import {Route, Switch} from 'react-router-dom';
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import UsersContainer from "./Components/Users/UsersContainer";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import {ErrorSnackbar} from "./Components/common/ErrorSnackbar";

const App = () => {
    return (
        <div className='app-wrapper'>
            <ErrorSnackbar/>
            <HeaderContainer/>
            <Sidebar/>
            <div className='app-wrapper-content'>
                <Switch>
                    <Route path='/dialogs' render={ () => <DialogsContainer/> }/>
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;

