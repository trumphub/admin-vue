export default {
    token(state) {
        return state.user.token
    },
    info(state) {
        return state.user.info
    },
    routes: state => state.permission.routes,
    collapse: state => state.app.collapse,
}
