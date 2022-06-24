import React, {useEffect} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsObjectType} from "../../../bll/profileReducer";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type PropsType = {
    posts: Array<postsObjectType>
    addPostAC: (textForNewPost: string) => void

}

export const MyPosts = ({posts, addPostAC}: PropsType) => {
    const postsElements = posts.map(p => <Post key={p.id} message={p.message}
                                               likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <AddPostForm addPostAC={addPostAC}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}




// N E W   C O M P O N E N T

type AddPostFormPropsType = {
    addPostAC: (textForNewPost: string) => void
}
type IFormInputs = {
    'post_area': string
}

export const AddPostForm = ({addPostAC}: AddPostFormPropsType) => {

    const schema = yup.object().shape({
        post_area: yup.string().required("Required"),
    })

    const {
        handleSubmit,
        control,
        formState: {errors, isSubmitSuccessful},
        reset
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    useEffect(() => {
        reset({post_area: ''})
    }, [isSubmitSuccessful, reset])

    const formSubmitHandler: SubmitHandler<any> = (data: IFormInputs) => {
        addPostAC(data.post_area)
    }

    return (
        <div>
            <FormGroup style={{maxWidth: '300px', display: "flex", alignItems: "center"}}>
                <Controller name={'post_area'} control={control}
                            render={({field}) => (
                                <TextField {...field} label="Type your post here"
                                           type='text'
                                           margin="normal"
                                           error={!!errors.post_area}

                                />)}/>
                <Button style={{width: '50%'}} variant={"contained"} onClick={handleSubmit(formSubmitHandler)}>Add
                    post</Button>
            </FormGroup>
        </div>
    )
}