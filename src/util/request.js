import axios from "axios";
import { Message } from 'element-ui';

import store from '@/store'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.token = localStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// {code:200,data:{...}} {code:403,message:"reason"}
instance.interceptors.response.use(
    response => {
        const { code, data, message } = response.data
        if (code === 200) {
            return data
        } else {
            Message({
                message,
                type: 'error',
                duration: 5000
            })
            if (code === 403) {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            }
            return Promise.reject(Error(message))
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance
