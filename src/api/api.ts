import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "ee717107-ce95-43f2-8bde-7fb8ef1ec3d4",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',  //URL c большой буквы
})
///////////////////////////////////////////////////////////

export const getUsers = (currentPage: number = 1, pageSize: number = 10) => {
    return instance.get(`users?Page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
}
// если функция должна получить данные, которых у нее нет, эта фунция должна получить данные из параметров.
// axios догадываемся возвращается промис и мы должны return то, что возвращаем get
export const getAuthMe = () => {
    return instance.get(`auth/me`)
        .then(response => {
            return response.data
        })
    //теперь наш Header знает, что мы авторизованы,
    // нужно эту информацию из data задиспачить в authReducer
}
export const deleteFollow = (id: number) => {
    return instance.delete(`follow/${id}`)
        .then(response => {
            return response.data;
        })
}
export const postFollow = (id: number) => {
    return instance.post(`follow/${id}`)
        .then(response => {
            return response.data;
        })
}