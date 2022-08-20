import { getInfo, login, logout } from "@/api/user"
import { resetRouter } from "@/router"

export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem("token"),
        info: {}
    }),
    mutations: {
        set_token(state, token) {
            state.token = token
        },
        set_info(state, info) {
            state.info = info
        }
    },
    actions: {
        async login({ commit }, user) {
            try {
                const token = await login(user)
                commit('set_token', token)
                localStorage.setItem("token", token)
            } catch (e) {
                throw Error(e)
            }
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('set_token', '')
                    commit('set_info', {})
                    localStorage.removeItem("token")
                    resetRouter()
                    resolve()
                }).catch(reject)
            })
        },
        getInfo({ commit }) {
            return new Promise(resolve => {
                getInfo().then(info => {
                    commit('set_info', info)
                    resolve(info)
                })
            })
        },
        resetToken({ commit }) {
            return new Promise(resolve => {
                commit('set_token', '')
                commit('set_info', {})
                localStorage.removeItem("token")
                resolve()
            })
        }
    }
}