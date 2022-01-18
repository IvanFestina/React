import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Settings} from "./Components/Settings/Settings";
import {Music} from "./Components/Music/Music";
import {News} from "./Components/News/News";
import {StoreType} from "./redux/old-store";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";

type AppPropsType = {
    store: StoreType
}

const App = (props: AppPropsType) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar store={props.store}/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs'
                           element={<DialogsContainer />}/>
                    <Route path='/profile'
                           element={<Profile
                               store={props.store}
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

