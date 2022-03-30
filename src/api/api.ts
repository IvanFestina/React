import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/profileReducer/profileReducer";
import {UserObjectType} from "../redux/usersReducer/userReducer";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "a9e10d5c-9ead-42c9-9cb1-b55bfc571047",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',  //URL c большой буквы
})
///////////////////////////////////////////////////////////
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<ResponseUserType>(`users?Page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
// если функция должна получить данные, которых у нее нет, эта фунция должна получить данные из параметров.
// axios догадываемся возвращается промис и мы должны return то, что возвращаем get
    },
    follow(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<{ data: string }, AxiosResponse<ResponseType<{}>>>(`profile/status`, {status})
    }
    //отправляем на сервак объект со свойством status
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
            .then(response => response.data)
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, RequestLoginType>(`auth/login`, {
            email,
            password,
            rememberMe
        }).then(res => res.data)
    },
    logout: () => instance.delete<ResponseType<{}>>(`auth/login`).then(res => res.data)
}


type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type RequestLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

type ResponseUserType = {
    items: UserObjectType[]
    totalCount: number
    error: string
}
// type UserType = {
//     name: string
//     id: number
//     uniqueUrlName: string
//     photos: {
//     small: string
//     large: string
//     }
//     status: string
//     fallowed: boolean
// }