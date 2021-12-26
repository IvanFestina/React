import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import {addPost, changeNewText, RootStateType, state, subscribe} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPostCallback={addPost}
                changeNewTextCallback={changeNewText}
            />
        </BrowserRouter>,
        document.getElementById('root')
    )
}

rerenderEntireTree()

subscribe(rerenderEntireTree);