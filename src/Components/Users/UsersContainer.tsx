import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC, setToggleFollowingProgressAC, setToggleIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unFollowAC
} from "../../redux/usersReducer/action";
import {RootState} from "../../redux/redux-store";
import {InitialStateType, UserObjectType} from "../../redux/usersReducer/types";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";
import {getUsers} from "../../api/api";

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
    setToggleFollowingProgressAC: (isFetching: boolean, userId: number) => void

}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export class UsersAPIComponent extends React.Component<UsersPropsType> {
    //если конструктор не делает ничего, кроме как перебрасывает свое управление SuperClass от которого он наследуется
    // который мы расширяем, то констр. можно не писать, это происходит за кадром
// Error Boundary HOC
    componentDidMount() {
        this.props.setToggleIsFetchingAC(true)

        getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize).then(data => { //axios
            this.props.setToggleIsFetchingAC(false)
            this.props.setUsersAC(data.items);
            this.props.setUsersTotalCountAC(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageAC(pageNumber)
        this.props.setToggleIsFetchingAC(true)

        getUsers(pageNumber, this.props.usersPage.pageSize) //axios
            .then(data => {
                this.props.setToggleIsFetchingAC(false)
                this.props.setUsersAC(data.items);
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
                   setToggleFollowingProgressAC={this.props.setToggleFollowingProgressAC}
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
    setToggleIsFetchingAC,
    setToggleFollowingProgressAC,
})(UsersAPIComponent);
