import React from 'react';
import s from './Header.module.css'

export const Header = (props: any) => {
    return <header className={s.header}>
        <img alt="Лого" src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png"/>
    </header>
}
