const express = require('express')

const userRouter = require('./user')

const baseURL = process.env["VUE_APP_BASE_API"]

module.exports = (middlewares, devServer) => {
    devServer.app.use(express.urlencoded({ extended: false }))
    devServer.app.use(express.json())
    devServer.app.use(baseURL, userRouter)

    return middlewares;
}