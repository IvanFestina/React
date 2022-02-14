import React from 'react';
import {Header} from "./Header";
import axios from "axios";
import {connect} from 'react-redux';
import {authInitialStateType, setAuthUserDataAC} from "../../redux/auth-reducer/auth-reducer";
import {RootState} from "../../redux/redux-store";


class HeaderContainer extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            //теперь наш Header знает, что мы авторизованы,
            // нужно эту информацию из data задиспачить в authReducer
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data //на сервере приходит id, а у нас в action userId
                    this.props.setAuthUserDataAC(id, email, login)
                }
            })
    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}

type mapStateToPropsType = {auth: authInitialStateType}
type mapDispatchToPropsType = { setAuthUserDataAC: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => void }

const mapStateToProps = (state: RootState): mapStateToPropsType => ({
    auth: state.auth
});
export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, RootState>(mapStateToProps, {setAuthUserDataAC})(HeaderContainer)