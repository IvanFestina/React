import React from "react";
import s from './Users.module.css';
import axios from "axios";
import userPhoto from '../../assets/images/userPhoto.png'

export class Users extends React.Component<any, any> {
   //если конструктор не делает ничего, кроме как перебрасывает свое управление SuperClass от которого он наследуется
   // который мы расширяем, то констр. можно не писать, это происходит за кадром

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

//наша компонента делает что-то свое, контруирование объекта происходит один раз.
    render = () => {
        return (
            <div>
                {this.props.usersPage.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} alt={''}/>
                </div>
                 <div>
                    {u.followed
                        ? <button onClick={() => {
                            this.props.unFollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            this.props.follow(u.id)
                        }}>Follow</button>}
                </div>
            </span>
                    <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
                </div>)}
            </div>
        );
    }
}
