import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/profileReducer";
import {UserObjectType} from "../redux/userReducer";

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
// если функция должна получить данные, которых у нее нет, эта фунция должна получить данные из параметров.
// axios догадываемся возвращается промис и мы должны return то, что возвращаем get
    },
    follow(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
    },
    getProfile(userId: number | null) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<{ data: string }, AxiosResponse<ResponseType<{}>>>(`profile/status`, {status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: Omit<ProfileType, "photos">) {
        return instance.put(`profile`, profile)

    }
    //отправляем на сервак объект со свойством status
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, RequestLoginType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout: () => instance.delete(`auth/login`),
    getCaptcha: () => instance.get<ResponseCaptchaType>(`/security/get-captcha-url`)
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
    captcha?: string | null
}

type ResponseUserType = {
    items: UserObjectType[]
    totalCount: number
    error: string
}
type ResponseCaptchaType = {
    url: string
}