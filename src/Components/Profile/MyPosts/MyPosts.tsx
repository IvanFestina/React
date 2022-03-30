import React, {ChangeEvent, useEffect} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsObjectType} from "../../../redux/profileReducer/profileReducer";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type PropsType = {
    posts: Array<postsObjectType>
    addPostAC: (textForNewPost: string) => void

}

export const MyPosts = ({posts, addPostAC}: PropsType) => {
    const postsElements = posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm addPostAC={addPostAC}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

// NEW COMPONENT
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
        reset({post_area: ''})}, [isSubmitSuccessful, reset])

    const formSubmitHandler: SubmitHandler<any> = (data: IFormInputs) => {
        addPostAC(data.post_area)
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup style={{maxWidth: '300px'}}>
                <Controller name={'post_area'} control={control}
                            render={({field}) => (
                                <TextField {...field} label="Type your post here"
                                           type='text'
                                           margin="normal"
                                           error={!!errors.post_area}

                                />)}/>
                <Button type='submit' variant={"contained"}>Add post</Button>
            </FormGroup>
        </form>
    )
}