import React from 'react';
import {Header} from "./Header";
import {connect} from 'react-redux';
import {authInitialStateType, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

// type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType

type PropsType = {
    authState: authInitialStateType
    logoutTC: () => void
}

class HeaderContainer extends React.Component<PropsType> {
    render() {
    // return <div>hey</div>
        return <Header authState={this.props.authState} logoutTC={logoutTC}/>
    }
}

type mapStateToPropsType = { authState: authInitialStateType }
type mapDispatchToPropsType = {
    logoutTC: () => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    authState: state.auth
});

export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {logoutTC})(HeaderContainer)