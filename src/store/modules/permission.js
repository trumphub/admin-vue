import { asyncRoutes, constantRoutes } from '@/router'

export default {
    namespaced: true,
    state: () => ({
        routes: []
    }),
    mutations: {
        set_routes(state, routes) {
            state.routes = routes
        }
    },
    actions: {
        generateRoutes({ commit }, role) {
            return new Promise(resolve => {
                let accessedRoutes
                if (role === 'admin') {
                    accessedRoutes = asyncRoutes
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
                }
                updateRedirect(accessedRoutes)
                commit('set_routes', filterRoutes(constantRoutes.concat(accessedRoutes), ''))
                resolve(accessedRoutes)
            })
        }
    }
}

function filterRoutes(routes, parentPath) {
    const res = [];
    routes.forEach((route) => {
        const tmp = { ...route };
        if (!tmp.hidden) {
            tmp.path = parentPath + tmp.path;
            if (tmp.children) {
                tmp.children = filterRoutes(
                    tmp.children,
                    tmp.path === "/" ? tmp.path : tmp.path + "/"
                );
            }
            res.push(tmp);
        }
    });
    return res;
}

function updateRedirect(routes) {
    routes.forEach(route => {
        if (route.children) {
            updateRedirect(route.children)
            route.redirect = (route.path === "/" ? "" : route.path) + '/' + route.children[0].path
        }
    })
}

function filterAsyncRoutes(routes, role) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(role, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, role)
            }
            res.push(tmp)
        }
    })
    return res
}

function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}
