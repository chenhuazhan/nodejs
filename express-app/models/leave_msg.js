const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/express', {useNewUrlParser: true})

let Schema = mongoose.Schema

let leaveMsgSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    replies: [{
        creator: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        created_time: {
            type: Date,
            default: Date.now
        }
    }],
    created_time: {
        type: Date,
        default: Date.now
    },
    deleted_time: {
        type: Date,
        default: null
    }
})

const LeaveMsg = mongoose.model('LeaveMsg', leaveMsgSchema)

module.exports = {
    async getAll() {
        try {
            return await LeaveMsg.find()
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async getLimit(start, pageSize) {
        try {
            return await LeaveMsg.find({
                deleted_time: null
            }).sort({'_id': -1}).skip(start).limit(pageSize)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async add(leaveMsg) {
        try {
            leaveMsg.replies = []
            return await new LeaveMsg(leaveMsg).save()
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async delete(id, creator) {
        try {
            return await LeaveMsg.where({
                _id: id,
                creator: creator
            }).updateOne({
                deleted_time: Date.now()
            })
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async getById(id) {
        try {
            id = id.replace(/"/g, '')
            return await LeaveMsg.findById(id)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async deleteById(id) {
        try {
            id = id.replace(/"/g, '')
            return await LeaveMsg.findByIdAndRemove(id)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async addReply(reply, id) {
        try {
            id = id.replace(/"/g, '')
            return await LeaveMsg.where({_id: id}).updateOne({
                $addToSet: {replies: reply}
            })
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async like(liker, id) {
        try {
            id = id.replace(/"/g, '')
            liker = liker.replace(/"/g, '')
            let ret = await LeaveMsg.findById(id)
            if (ret.likes.includes(liker)) {
                //存在就删除
                let ret = await LeaveMsg.where({_id: id}).updateOne({
                    $pull: {likes: liker}
                })
                if (ret.ok === 1) {
                    return -1
                } else {
                    return 0
                }
            } else {
                //不存在就添加
                let ret = await LeaveMsg.where({_id: id}).updateOne({
                    $addToSet: {likes: liker}
                })
                console.log(ret);
                if (ret.ok === 1) {
                    return 1
                } else {
                    return 0
                }
            }
        } catch (e) {
            ErrorHandler(e)
        }
    }

}