const path = require("path");

function resolve (dir) {
    return path.join(__dirname, dir)
}

let proxyObj = {}
// 代理对象
proxyObj['/'] = {
    //websocket
    ws:false,
    // 目标地址
    target:'http://localhost:8081',
    // 发送请求头host设置target
    changeOrigin: true,
    // 不需要重写（遇到后端网关转发请求才需要）
    pathReWrire:{
        '^/':'/'
    }
}


// 请求转发
module.exports = {
    devServer: {
        host:'localhost',
        port:8080,
        proxy:proxyObj
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("base", resolve("baseConfig"))
            .set("public", resolve("public"));
    }
}