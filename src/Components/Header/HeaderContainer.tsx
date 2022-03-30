import React from 'react';
import {Header} from "./Header";
import {connect} from 'react-redux';
import {authInitialStateType, getAuthUserDataTC, logoutTC} from "../../redux/auth-reducer/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    }

    render() {
        return <Header {...this.props} authState={this.props.authState} logoutTC={logoutTC}/>
    }
}

type mapStateToPropsType = { authState: authInitialStateType }
type mapDispatchToPropsType = {
    getAuthUserDataTC: () => void
    logoutTC: () => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    authState: state.auth
});
export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getAuthUserDataTC,
    logoutTC
})(HeaderContainer)