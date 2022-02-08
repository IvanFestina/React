import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer/action";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profileReducer/types";

export type MapStatePropsType = {
    profile: ProfileType | string
}
export type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType | string) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchToPropsType

export class ProfileContainer extends React.Component<UsersPropsType>{

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
                {/*<Profile {...this.props} profile={this.props.profile} />*/}
            </div>
        );
    }
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})

export  default connect<MapStatePropsType,MapDispatchToPropsType,{},AppStateType>(mapStateToProps, {setUserProfile})(ProfileContainer)