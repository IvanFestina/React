import React from 'react'
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


type IFormInputs = {
    email: string
    password: string
    Checkbox: string
}

export const Login = (props: any) => {
    const {
        register, // like a reference
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IFormInputs>()

    const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        alert(JSON.stringify(data))
    }

    return (
        <Grid container justifyContent={'center'} style={{marginTop: '100px'}}>
            <Grid item justifyContent={'center'}>
                <Avatar>
                    <LockOutlinedIcon color={"action"}/>
                </Avatar>
                <FormControl>
                    <FormGroup>
                        <TextField label="Email" margin="normal"/>
                        <TextField type="password" label="Password"
                                   margin="normal"
                        />
                        <FormControlLabel label={'Remember me'} control={
                            <Controller
                                name="Checkbox"
                                control={control}
                                render={({field: {value}}) => (
                                    <Checkbox
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                            />
                        }/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                    </FormGroup>
                </FormControl>
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