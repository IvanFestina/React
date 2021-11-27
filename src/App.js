import React, { Component } from 'react';
import './App.css';

const App = () => {
  return (
  <div>
      <div><h1>Очень крутой div</h1></div>
       <Header />
       <Technologies />
 </div>
  );
}

const Technologies = () => {
return (
    <div className="App">
        <ul>
            <li>css</li>
            <li>html</li>
            <li>js</li>
            <li>react</li>
        </ul>
    </div>)
}

const Header = () => {
  return (
  <div>
    <a href="#s'">Home</a>
    <a href="#s'">News Feed</a>
    <a href="#s'">Messages</a>
 </div>
  );
}

export default App;
