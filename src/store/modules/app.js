export default {
    namespaced: true,
    state: () => ({
        collapse: !!localStorage.getItem("collapse")
    }),
    mutations: {
        set_collapse(state, collapse) {
            state.collapse = collapse
        }
    },
    actions: {
        updateCollapse({ commit, state }) {
            const collapse = !state.collapse
            commit('set_collapse', collapse)
            if (collapse) {
                localStorage.setItem("collapse", 1)
            } else {
                localStorage.removeItem("collapse")
            }
        }
    }
}
