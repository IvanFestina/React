import React from 'react'
import {useForm, SubmitHandler, Controller} from "react-hook-form";
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

type IFormInputs = {
    email: string
    password: string
    rememberMe: boolean
}
const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().min(4, "Must be longer than 2 characters").max(20).required("Required"),
    rememberMe: yup.boolean()
})

export const Login = (props: any) => {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        dispatch(loginTC(data.email, data.password, data.rememberMe))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{marginTop: '100px'}}>
            <Grid item justifyContent={'center'}>
                <Avatar>
                    <LockOutlinedIcon color={"action"}/>
                </Avatar>
                <form onSubmit={handleSubmit(formSubmitHandler)}>
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
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    )
}
