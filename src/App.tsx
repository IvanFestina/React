import React from 'react';
import './App.css';


const App = () => {
    return (
        <div className='app-wrapper'>
            <header className="header">
                <img alt="Лого" src="https://i01piccdn.sogoucdn.com/26373061e1112eba"/>
            </header>
            <nav className="nav">
                <div>
                <a>Profile</a>
                </div>
                <div>
                <a>Messages</a>
                </div>
                <div>
                <a>News</a>
                </div>
                <div>
                <a>Music</a>
                </div>
                <div>
                <a>Settings</a>
                </div>
            </nav>
            <div className="content">
            <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRidCscVYZ6qebSD_kHOsso8EG3Xe7qcyegw&usqp=CAU"/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                My posts
                    <div>
                        New post
                    </div>
                    <div>
                        <div>
                            Post 1
                        </div>
                        <div>
                            Post 2
                        </div>
                    </div>
            </div>
            </div>

        </div>
    );
}

export default App;

