import React from 'react';
import ReactDOM from 'react-dom';
import {MainTSApp} from "./App";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainTSApp />, div);
    ReactDOM.unmountComponentAtNode(div)
})
