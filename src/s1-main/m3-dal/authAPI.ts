import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    authMe() {
        return instance.post<UserType>('auth/me', {})
    },
    changeName(name: string) {
        return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', {name});
    },
    changeImage(avatar: string) {
        return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', {avatar});
    },
    register(data: LoginType) {
        return instance.post<AxiosResponse<RegisterUserResponseType>>('auth/register', data)
    },
    login(data: LoginType) {
        return instance.post<UserType>('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    }
}


//types
type UpdateUserResponseType = {
    updatedUser: UserType
    error?: string
}
type RegisterUserResponseType = {
    addedUser: AddedUserType
    error?: string
}
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    token: string
    tokenDeathTime: number
}
type AddedUserType = {
    created: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    updated: string,
    verified: boolean,
    __v: number,
    _id: string
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean
}