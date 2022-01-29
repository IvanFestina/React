import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Sidebar} from "./Components/Navbar/Sidebar";
import {Profile} from "./Components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {UsersContainer} from "./Components/Users/UsersContainer"


const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Sidebar />
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                    <Route path='/profile' element={<Profile />}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

