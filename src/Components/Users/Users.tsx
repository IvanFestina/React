import React from "react";
import s from "./Users.module.css";
import {InitialStateUserType} from "../../redux/userReducer";
import Pagination from "@mui/material/Pagination";
import {User} from "./User";

export type UsersPropsType = {
    onPageChanged: (event: React.ChangeEvent<unknown>, pageNumber: number) => void
    usersPage: InitialStateUserType
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}
export const Users = ({
                          onPageChanged,
                          usersPage,
                          followTC,
                          unFollowTC
                      }: UsersPropsType) => {
    let pageCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize)

    return (
        <div className={s.usersBlock}>
            <div className={s.pagination}>
                <Pagination count={pageCount} variant="outlined" color='primary'
                            onChange={onPageChanged}/>
            </div>
            <div className={s.usersList}>
                {
                    usersPage.users.map(u => <User user={u} key={u.id}
                                                   usersPage={usersPage}
                                                   followTC={followTC}
                                                   unFollowTC={unFollowTC}
                        />
                    )
                }
            </div>
        </div>
    )
}