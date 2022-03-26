import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/profileReducer/profileReducer";

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
        return instance.get(`users?Page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
// если функция должна получить данные, которых у нее нет, эта фунция должна получить данные из параметров.
// axios догадываемся возвращается промис и мы должны return то, что возвращаем get
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<{data: string}, AxiosResponse<ResponseStatus<{data: string}>>>(`profile/status`, {status})
    }
    //отправляем на сервак объект со свойством status
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data)
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    }
}

type ResponseStatus<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}