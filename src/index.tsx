import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import {store} from "./redux/store"
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";

export const onChange = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App store={store}/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    )
}

onChange()

store.subscribe(() => {
    let state = store.getState();
    onChange()
});