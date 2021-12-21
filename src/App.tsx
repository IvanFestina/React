import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import { Route, Routes} from "react-router-dom";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {RootStateType} from "./redux/state";

type AppPropsType = {
    state: RootStateType,
    addPost: (message: string) => void
}

const App = (props: AppPropsType) => {
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar friends={props.state.sideBar.friends}/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs'
                               element={<Dialogs
                                   dialogs={props.state.dialogsPage.dialogs}
                                   message={props.state.dialogsPage.messages}/>}/>
                        <Route path='/profile'
                               element={<Profile
                                   profilePage={props.state.profilePage}
                                   addPost={props.addPost}
                                   />}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;

