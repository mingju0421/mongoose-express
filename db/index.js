/*
* 该模块专门用于连接数据库
* */
// 数据库的端口号
const POST = 27017
// 数据库的名字
const DB_NAME = 'yanxuan'


let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

// 构建一个Promise实例
module.exports = new Promise((resolve, reject) => {
        // 连接数据库
        mongoose.connect(`mongodb://localhost:${POST}/${DB_NAME}`, {useNewUrlParser: true})

        // 绑定监听
        mongoose.connection.once('open',(err) => {
            if (!err) {
                console.log(`位于本机上的${POST}端口的${DB_NAME}数据库连接成功了`)
                resolve()
            }else {
                reject(err)
            }
        })
    })

// module.exports = dbPromise