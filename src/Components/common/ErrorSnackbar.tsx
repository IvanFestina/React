import React, {SyntheticEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAppErrorAC} from "../../redux/auth-reducer";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<AppStateType, string | null>(state => state.auth.error)

    const dispatch = useDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
