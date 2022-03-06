import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profileReducer/types";
import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getUserProfileTC} from "../../redux/profileReducer/reducer";

type PathParamsType = { //эти типы приходят из withRouter
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType | null
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>   // в RouteComponentProps закидываем наши типы
// type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = '2'
        }
        this.props.getUserProfileTC(userId)
    }

    render() {return (
            <div>
            <h1>hello</h1>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})
const ProfileContainerURL = withRouter(ProfileContainer)

export default connect<MapStatePropsType,MapDispatchToPropsType,{},AppStateType>(mapStateToProps, {getUserProfileTC})(ProfileContainerURL)