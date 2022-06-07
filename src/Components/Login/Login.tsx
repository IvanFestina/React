import React from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import Input from "@mui/material/Input";

type IFormInputs = {
    email: string
    password: string
    rememberMe: boolean
    captchaSymbols: string | null
}
const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().min(4, "Must be longer than 2 characters").max(20).required("Required"),
    rememberMe: yup.boolean()
})

export const Login = (props: any) => {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        dispatch(loginTC(data.email, data.password, data.rememberMe, data.captchaSymbols))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{marginTop: '100px'}}>
            <Grid item justifyContent={'center'}>
                <Avatar style={{alignSelf: 'center'}}>
                    <LockOutlinedIcon color={"action"}/>
                </Avatar>
                <FormGroup>
                    <Controller name={'email'} control={control}
                                render={({field}) => (
                                    <TextField {...field} label="Email"
                                               type='email'
                                               margin="normal"

                                               error={!!errors.email}
                                               helperText={errors?.email ? errors?.email?.message : ''}
                                    />)}/>
                    <Controller name={'password'} control={control}
                                render={({field}) => (
                                    <TextField {...field} type="password"
                                               label="Password"
                                               margin="normal"
                                               error={!!errors.password}
                                               helperText={errors?.password ? errors?.password?.message : ''}
                                    />)}/>
                    <FormControlLabel label={'Remember me'} control={
                        <Controller name={'rememberMe'} control={control} render={
                            ({field}) => (<Checkbox {...field}/>)
                        }/>
                    }
                    />
                    <Button variant={'contained'} color={'primary'}
                            onClick={handleSubmit(formSubmitHandler)}>
                        Sign in
                    </Button>
                    {captchaUrl &&
                    <div style={{marginTop: '15px'}}>
                        <Controller name={'captchaSymbols'} control={control}
                                    render={({field}) => (
                                        <Input {...field} type="text"
                                               placeholder="Type symbols here"/>)}/>
                        <br/>
                        <img src={captchaUrl}
                             alt={'captcha'}/>
                    </div>}
                </FormGroup>
            </Grid>
        </Grid>
    )
}
