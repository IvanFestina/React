import React from "react";
import preloader from "../../../assets/images/preloader.svg";

export const Preloader = (props: any) => {
    return <>
        <img alt={'loading'} src={preloader}/>
    </>
}