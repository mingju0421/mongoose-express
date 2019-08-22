// 1. 引入express
let express = require('express')

// 引入数据库连接模块
let db = require('./db')
// 引入模型对象
let usersModel = require('./model/users')


//设置端口
const PORT = 1008


// 2.创建app应用
let app = express()
//使用中间件解析post请求
app.use(express.urlencoded({extended: true}))



db
    .then(() => {
        app.post('/login', async (request, reponse) => {
            //1.获取用户输入
            // console.log(request.body)
            let {email, password} = request.body
            console.log(email, password)
            //2.校验数据格式
            let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/
            let passwordReg = /^(\w){6,20}$/
            // // 使用正则去校验
            if (!emailReg.test(email)) {
                console.log(email)
                reponse.send('邮箱输入不合法')
                return
            }
            if (!passwordReg.test(password)) {
                console.log(password)
                reponse.send('密码输入不合法')
                return
            }
            // 3.去数据库中查找该数据
            let findResult = await usersModel.findOne({
                email
            })
            if (findResult) {
                console.log(findResult)
                if (findResult.password === password ) {
                    reponse.send(JSON.stringify({code: 1, email}))
                }else {
                    reponse.send('密码错误')
                }
                return
            }else {
                 await usersModel.create({
                    email,
                    password,
                })
                reponse.send(JSON.stringify({code: 1, email}))
            }



            //4.写入数据



            reponse.send('ok')
        })

    })
    .catch(() => {

    })



// 3.设置路由
// app.post('/login', async (request, reponse) => {
//     //1.获取用户输入
//     console.log(request.body)
//     let {email, passwoed} = request.body
//     console.log(request.body)
//     //2.校验数据格式
//     let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/
//     // // 使用正则去校验
//     if (!emailReg.test(email)) {
//         console.log(email)
//         reponse.send('邮箱输入不合法')
//         return
//     }
//     //3.去数据库中查找该数据
//
//
//
//
//     //4.写入数据
//
//
//
//     reponse.send('ok')
// })

// 4.绑定端口监听
app.listen(PORT, (err) => {
    if (!err) console.log(`${PORT}端口服务器启动成功`)
    else console.log(err)
})