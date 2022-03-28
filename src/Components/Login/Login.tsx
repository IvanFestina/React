import React from 'react'
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

type IFormInputs = {
    email: string
    password: string
}
const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().min(4, "Must be longer than 2 characters").max(20).required("Required")
})

export const Login = (props: any) => {
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        alert(JSON.stringify(data))
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
                                                   error={!!errors.email}
                                                   helperText={errors?.password ? errors?.password?.message : ''}

                                        />)}/>
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    )
}

// type IFormInputs = {
//     email: string
//     password: string
// }
//
// export const Login = (props: any) => {
//     const {
//         register, // like a reference
//         handleSubmit,
//         watch,
//         formState: {errors}
//     } = useForm<IFormInputs>()
//
//     const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
//         alert(JSON.stringify(data))
//     }
//
//     return (
//         <div style={{color: "black"}}>
//             <h1>Authorisation Page</h1>
//             <form onSubmit={handleSubmit(formSubmitHandler)}>
//                 <input defaultValue='example@test.com'
//                        {...register('email', {
//                            required: true,
//                            minLength: 5
//                        })}/> {/*this input is referencing 'email' key*/}
//                 <br/>
//                 <input type='password'
//                        {...register('password', {required: true})}/>
//                 <br/>
//                 {errors.password && <span>This field is required</span>}
//                 <br/>
//                 <input type='submit'/>
//             </form>
//         </div>
//     )
// }