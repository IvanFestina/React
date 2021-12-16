import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";

type dialogObjectType = {
    id: string;
    name: string
}
type messageObjectType = {
    id: string;
    message: string
    img: string
    isYou: boolean
}
type postsObjectType = {
    id: string;
    message: string
    likesCount: number
}
type friendsObjectType = {
    id: string
    name: string
    img: string
}
type sideBarType = {
    friends: Array<friendsObjectType>
}
type profilePageType = {
    posts: Array<postsObjectType>
}
type messagesPageType = {
    messages: Array<messageObjectType>
    dialogs: Array<dialogObjectType>
}
type navType = {
    profilePage: profilePageType
    dialogsPage: messagesPageType
    sideBar: sideBarType
}
type stateType = {
    state: navType
}

const App = (props: stateType) => {
    return (
        <BrowserRouter>
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
                                   posts={props.state.profilePage.posts}/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

