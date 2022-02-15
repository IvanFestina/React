import React from 'react';
import {Header} from "./Header";
import {connect} from 'react-redux';
import {authInitialStateType, setAuthUserDataAC} from "../../redux/auth-reducer/auth-reducer";
import {RootState} from "../../redux/redux-store";
import {getAuthMe} from "../../api/api";


class HeaderContainer extends React.Component<any, any> {

    componentDidMount() {
        getAuthMe().then(data => {  //axios
            if (data.resultCode === 0) {
                let {id, email, login} = data.data //на сервере приходит id, а у нас в action userId
                this.props.setAuthUserDataAC(id, email, login)
            }
        })
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer

    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}

type mapStateToPropsType = { auth: authInitialStateType }
type mapDispatchToPropsType = { setAuthUserDataAC: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => void }

const mapStateToProps = (state: RootState): mapStateToPropsType => ({
    auth: state.auth
});
export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, RootState>(mapStateToProps, {setAuthUserDataAC})(HeaderContainer)