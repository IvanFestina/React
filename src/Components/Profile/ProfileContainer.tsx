import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer/action";
import {RootState} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profileReducer/types";
import {withRouter} from "react-router";
import {Profile} from "./Profile";

type PathParamsType = {
    useId: string
}

export type MapStatePropsType = {
    profile: ProfileType | string
}
export type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType | string) => void
}
export type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType

export class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
     axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
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
const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStatePropsType,MapDispatchToPropsType,{},RootState>(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)