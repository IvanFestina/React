import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getUserProfileTC, ProfileType} from "../../redux/profileReducer/profileReducer";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

type PathParamsType = { //эти типы приходят из withRouter
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>   // в RouteComponentProps закидываем наши типы

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfileTC(userId)
    }

    render() {

        return (
            <div>
                <h1>hello</h1>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {getUserProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)