import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    getStatusTC,
    getUserProfileTC,
    ProfileType, savePhotoTC,
    updateStatusTC
} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

type PathParamsType = { //эти типы приходят из withRouter
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
    status: string
    authorizedUserId: number | null
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhotoTC:(file: File) => void
    saveProfileTC:() => void
}
type ProfileContainerPropsType =
    MapStatePropsType
    & MapDispatchToPropsType
    & RouteComponentProps<PathParamsType>   // в RouteComponentProps закидываем наши типы

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileTC(userId)
        this.props.getStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {

        return (
            <>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusTC={this.props.updateStatusTC}
                         savePhotoTC={this.props.savePhotoTC}
                         saveProfileTC={this.props.saveProfileTC}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC, savePhotoTC, saveProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)