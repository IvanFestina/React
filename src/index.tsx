import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DialogItem} from "./Components/Dialogs/DialogItem/DialogItem";
import {Message} from "./Components/Dialogs/Message/Message";
import {MyPosts} from "./Components/Profile/MyPosts/MyPosts";

let dialogsData = [
    {id: '1', name: 'Sergey'},
    {id: '2', name: 'Mark'},
    {id: '3', name: 'Alexandr'},
    {id: '4', name: 'Mike'},
    {id: '5', name: 'John'},
    {id: '6', name: 'Fill'}
]
let messagesData = [
    {id: '1', message: 'Hello'},
    {id: '2', message: "Hi, my name's Ivan, I have a proposal for you!"},
    {id: '3', message: "Yea? What's up with a proposal?!"},
]

let postsData = [
    {id: '1', message: "Hello, my name's Ivan", likesCount: 5},
    {id: '2', message: "I'm fine, thanks", likesCount: 22},
    {id: '3', message: "I'm not fine", likesCount: 202},
]

let dialogsElements = dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)
let messageElements = messagesData.map(m => <Message message={m.message}/>)
let postsElements = postsData.map(p => <MyPosts message={p.message} likesCount={p.likesCount}/>)

ReactDOM.render(<App name={}/>, document.getElementById('root'));

reportWebVitals();
