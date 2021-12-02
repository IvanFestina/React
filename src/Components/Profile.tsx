import React from "react";
import './Profile.module.css'

const Profile = () => {
    return (
    <div className="content">
        <div>
            <img
                src="https://www.pikpng.com/pngl/b/603-6034862_header-banner-png-banner-images-header-png-clipart.png"/>
        </div>
        <div className="content_ava">
            ava + description
        </div>
        <div className='content_posts'>
            My posts
            <div className='content_newPost'>
                New post
            </div>
            <div>
                <div className='content_item'>
                    Post 1
                </div>
                <div className='content_item'>
                    Post 2
                </div>
            </div>
        </div>
    </div>
)
}

export default Profile