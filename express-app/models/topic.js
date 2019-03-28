const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/express', { useNewUrlParser: true })

let Schema = mongoose.Schema

let topicSchema = new Schema({
    plate: {
        type: String,
        required: true
    },
    title: {
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
    updated__time: {
        type: Date,
        default: Date.now
    },
    deleted_time: {
        type: Date,
        default:null
    }
})

const Topic = mongoose.model('Topic', topicSchema)

module.exports = {
    async getAll(){
        return await Topic.find()
    },
    async add(topic){
        return await new Topic(topic).save()
    },
    async getById(id){
        id = id.replace(/"/g, '')
        return await Topic.findById(id.replace(/"/g, ''))
    },
    async updateById(id, topic){
        id = id.replace(/"/g, '')
        return await Topic.findByIdAndUpdate(id, user)
    },
    async deleteById(id){
        id = id.replace(/"/g, '')
        return await Topic.findByIdAndRemove(id)
    }

}