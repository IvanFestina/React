import React from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/auth-reducer";
import {AppStateType} from "../../bll/redux-store";
import {Redirect} from "react-router-dom";
import Input from "@mui/material/Input";
import Logo from '../../assets/images/logo.png';
import s from './LoginPage.module.css'
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";

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

export const LoginPage = (props: any) => {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        debugger
        dispatch(loginTC(data.email, data.password, data.rememberMe, data.captchaSymbols))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{marginTop: '100px'}}>
            <Paper elevation={4} style={{padding: '30px'}}>
                <Grid item justifyContent={'center'} style={{maxWidth: '450px'}}>
                    <div className={s.logoBlock}>
                        <img src={Logo} alt={'Logo'}/>
                    </div>
                    <FormGroup onSubmit={handleSubmit(onSubmit)}
                               style={{marginTop: '15px'}}>
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
                        <Button
                            style={{marginTop: '15px', width: '50%', alignSelf: 'center'}}
                            variant={'contained'} color={'primary'}
                            onClick={handleSubmit(onSubmit)}>
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
                        <div className={s.loginHelper}>
                            <Typography>To log in get registered <a
                                href={'https://social-network.samuraijs.com/'}>here</a>
                                <br/> or use common test account credentials:
                                Email: ivanfestina@gmail.com
                                Password: free
                            </Typography>
                        </div>
                    </FormGroup>
                </Grid>
            </Paper>
        </Grid>
    )
}
