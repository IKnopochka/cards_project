import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const passwordAPI = {
    sendToken(email: string) {
        debugger
        return instance.post<TokenType>('auth/forgot', {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
        })
    },
    getToken(password: string, resetPasswordToken: string) {
        return instance.post<TokenType>('auth/set-new-password', {password, resetPasswordToken})
    }
}
type TokenType = {
    info: string,
    error: string;
}