const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/express', {useNewUrlParser: true})

let Schema = mongoose.Schema

let articleSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        default: null
    },
    category_id: {
        type: String,
        default: null
    },
    content: {
        type: String,
        required: true
    },
    views: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
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
        },
        reply_to: {
            type: String,
            default: null
        },
        status: {
            type: Number,
            // 0 驳回rejected
            // 1 上墙approved
            enum: [0, 1],
            default: 0
        }
    }],
    created_time: {
        type: Date,
        default: Date.now
    },
    deleted_time: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        // drafted 草稿箱
        // published 已发布
        enum: ['drafted', 'published'],
        default: 'drafted'
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = {
    async getAll() {
        try {
            return await Article.find()
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async getLimit(start, pageSize) {
        try {
            return await Article.find({
                deleted_time: null
            }).sort({'_id': -1}).skip(start).limit(pageSize)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async add(article) {
        try {
            article.replies = []
            return await new Article(article).save()
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async delete(id, creator) {
        try {
            return await Article.where({
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
            return await Article.findById(id)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async deleteById(id) {
        try {
            id = id.replace(/"/g, '')
            return await Article.findByIdAndRemove(id)
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async addReply(reply, id) {
        try {
            id = id.replace(/"/g, '')
            return await Article.where({_id: id}).updateOne({
                $addToSet: {replies: reply}
            })
        } catch (e) {
            ErrorHandler(e)
        }
    },
    async like(liker, id) {
        try {
            let ret = await Article.findById(id)
            if (ret.likes.includes(liker)) {
                //存在就删除
                let ret = await Article.where({_id: id}).updateOne({
                    $pull: {likes: liker}
                })
                if (ret.ok === 1) {
                    return -1
                } else {
                    return 0
                }
            } else {
                //不存在就添加
                let ret = await Article.where({_id: id}).updateOne({
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