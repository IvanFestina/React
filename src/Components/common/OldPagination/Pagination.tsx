import s from "../../Users/Users.module.css";
import React from "react";

type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
}

export const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}: PaginationPropsType) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return <>
        {pages.map(p => <span className={currentPage === p ? s.selectedPage : ''}
                              onClick={(e) => onPageChanged(p)}>{p}</span>)}

    </>
}
