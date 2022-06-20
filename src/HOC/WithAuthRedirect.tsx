import {Redirect} from "react-router-dom";
import React, {FC} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../bll/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: React.ComponentType<T>) {

    const RedirectComponent: FC<MapStatePropsType> = (props) => {
    let {isAuth, ...restProps} = props
        console.log(isAuth)
        if (!isAuth) return <Redirect to={'login'}/>
        return <Component {...restProps as T}/>
    }


    return connect<MapStatePropsType, {}, MapStatePropsType, AppStateType >(mapStateToPropsForRedirect, {})(RedirectComponent)
}
