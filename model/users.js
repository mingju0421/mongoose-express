// 引入模型对象
let mongoose = require('mongoose')

// 引入Schema
let Schema = mongoose.Schema;
// 2.构建一个约束对象
let userSchema = new Schema({
    email: {
        type: String,
        required: true,  // 必须填写
        unique: true  // 唯一字段
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,  // 必须填写
    },
    // phone: {
    //     type: Number,
    //     required: true,  // 必须填写
    // },
    date: {
        type: Date,
        default: Date.now()
    },
    enable_flag: {
        type: String,
        default: 'Y'
    }

})
// 3. 创建一个模型对象
module.exports = mongoose.model('users',userSchema)