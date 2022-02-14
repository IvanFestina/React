import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer/action";
import {RootState} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profileReducer/types";

import {Profile} from "./Profile";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = { //эти типы приходят из withRouter
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType | null
}
export type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType | null) => void
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>   // в RouteComponentProps закидываем наши типы
// type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
    let userId = this.props.match.params.userId //описываем тип, который возвращается из userId - PathParamsType
    if(!userId) { userId = '2' }
     axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {return (
            <div>
            <h1>hello</h1>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): MapStatePropsType => ({
    profile: state.profilePage.profile
})
const ProfileContainerURL = withRouter(ProfileContainer)

export default connect<MapStatePropsType,MapDispatchToPropsType,{},RootState>(mapStateToProps, {setUserProfile})(ProfileContainerURL)