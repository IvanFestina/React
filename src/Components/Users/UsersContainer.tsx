import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC, setToggleIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unFollowAC
} from "../../redux/usersReducer/action";
import {RootState} from "../../redux/redux-store";
import {InitialStateType, UserObjectType} from "../../redux/usersReducer/types";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";

type MapStatePropsType = {
    usersPage: InitialStateType
}
type MapDispatchPropsType = {
    followAC: (userID: number) => void
    unFollowAC: (userID: number) => void
    setUsersAC: (users: UserObjectType[]) => void
    setCurrentPageAC: (pageNumber: number) => void
    setUsersTotalCountAC: (totalCount: number) => void
    setToggleIsFetchingAC: (isFetching: boolean) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export class UsersAPIComponent extends React.Component<UsersPropsType> {
    //если конструктор не делает ничего, кроме как перебрасывает свое управление SuperClass от которого он наследуется
    // который мы расширяем, то констр. можно не писать, это происходит за кадром
// Error Boundary HOC
    componentDidMount() {
        this.props.setToggleIsFetchingAC(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?Page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items);
                this.props.setUsersTotalCountAC(response.data.totalCount)
            })
    }
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageAC(pageNumber)
        this.props.setToggleIsFetchingAC(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?Page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items);
            })
            }
//наша компонента делает что-то свое, контруирование объекта происходит один раз.
    render = () => {

        return <>
            {this.props.usersPage.isFetching ? <Preloader/> : null}
            <Users followAC={this.props.followAC}
                   unFollowAC={this.props.unFollowAC}
                   setUsersTotalCountAC={this.props.setUsersTotalCountAC}
                   usersPage={this.props.usersPage}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}
export const UsersContainer = connect(mapStateToProps, {
    followAC,
    unFollowAC,
    setUsersAC,
    setCurrentPageAC,
    setUsersTotalCountAC,
    setToggleIsFetchingAC
})(UsersAPIComponent);
