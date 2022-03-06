import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "1d92dfb6-9966-4df5-8204-d62d7f7e2396",
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
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data)
        //теперь наш Header знает, что мы авторизованы,
        // нужно эту информацию из data задиспачить в authReducer
    }
}