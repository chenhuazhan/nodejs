const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/express', { useNewUrlParser: true })

let Schema = mongoose.Schema

let userSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意：这里不要写 Date.now() 因为会即刻调用
        // 这里直接给了一个方法：Date.now
        // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/images/avatar/default.png'
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    identity: {
        type: Number,
        // 身份标识：
        // 1（默认普通用户）
        // 2（管理员）
        enum: [1, 2],
        default: 1
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {
    async getAllUserInfo(){
        return await User.find()
    },
    async addUser(user){
        return await new User(user).save()
    },
    async getUserInfoById(id){
        id = id.replace(/"/g, '')
        return await User.findById(id.replace(/"/g, ''))
    },
    async getUserInfoByEmail(email){
        return await User.findOne({email: email})
    },
    async updateUserInfoById(id, user){
        id = id.replace(/"/g, '')
        return await User.findByIdAndUpdate(id, user)
    },
    async deleteUserById(id){
        id = id.replace(/"/g, '')
        return await User.findByIdAndRemove(id)
    },
    async login(user){
        if(!(user.nickname || user.email)){
            return false
        }
        let obj = user.nickname ? {
                nickname: user.nickname,
                password: user.password
            }:{
                email: user.email,
                password: user.password
            }
        return await User.findOne(obj)
    },
    async register(user){
        try{
            if(await this.getUserInfoByEmail(user.email)){
                return 403
            }else{
                return 200
            }
        }catch (e) {
            return 500
        }
    }

}