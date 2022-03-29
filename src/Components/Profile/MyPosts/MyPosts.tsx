import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostAC, postsObjectType} from "../../../redux/profileReducer/profileReducer";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch} from "react-redux";

type PropsType = {
    posts: Array<postsObjectType>
    textForNewPost: string
    updateNewPostText: (text: string) => void
    addPost: (textForNewPost: string) => void
}

export const MyPosts = ({posts, textForNewPost, updateNewPostText, addPost}: PropsType) => {
    const postsElements = posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm addPost={addPost} updateNewPostText={updateNewPostText} textForNewPost={textForNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

// NEW COMPONENT
type AddPostFormPropsType = {
    textForNewPost: string
    updateNewPostText: (text: string) => void
    addPost: (textForNewPost: string) => void
}
type IFormInputs = {
    'post_area': string
}

export const AddPostForm = ({textForNewPost, updateNewPostText, addPost}: AddPostFormPropsType) => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        post_area: yup.string().required("Required"),
    })

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)})

    const formSubmitHandler: SubmitHandler<any> = (data: IFormInputs) => {
        dispatch(addPostAC(data.post_area))
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup style={{maxWidth: '300px'}}>
                <Controller name={'post_area'} control={control}
                            render={({field}) => (
                                <TextField {...field} label="Type your post here"
                                           type='text'
                                           margin="normal"
                                />)}/>
                <Button type='submit' variant={"contained"}>Add post</Button>
            </FormGroup>
        </form>
    )
}