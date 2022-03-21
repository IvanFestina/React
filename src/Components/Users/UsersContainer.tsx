import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPageAC,
} from "../../redux/usersReducer/action";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateType} from "../../redux/usersReducer/types";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";
import {followTC, getUsersTC, unFollowTC} from "../../redux/usersReducer/userReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

type MapStatePropsType = {
    usersPage: InitialStateType
}
type MapDispatchPropsType = {
    setCurrentPageAC: (pageNumber: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export class UsersAPIComponent extends React.Component<UsersPropsType> {
    //если конструктор не делает ничего, кроме как перебрасывает свое управление SuperClass от которого он наследуется
    // который мы расширяем, то констр. можно не писать, это происходит за кадром
// Error Boundary HOC
    componentDidMount() {
        this.props.getUsersTC(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.usersPage.pageSize)
    }
//наша компонента делает что-то свое, контруирование объекта происходит один раз.
    render = () => {

        return <>
            {this.props.usersPage.isFetching ? <Preloader/> : null}
            <Users
                usersPage={this.props.usersPage}
                onPageChanged={this.onPageChanged}
                followTC={this.props.followTC}
                unFollowTC={this.props.followTC}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setCurrentPageAC,
        getUsersTC,
        followTC,
        unFollowTC
    }),
    withRouter,
    withAuthRedirect,
    )(UsersAPIComponent)