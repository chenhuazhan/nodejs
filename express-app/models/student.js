const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/express',{ useNewUrlParser: true })

let Schema = mongoose.Schema

let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
})
const Student = mongoose.model('Student', studentSchema)

module.exports = {
    async getAllStudentInfo(){
        return await Student.find()
    },
    async addStudent(student){
        return await new Student(student).save()
    },
    async getStudentInfoById(id){
        id = id.replace(/"/g, '')
        return await Student.findById(id.replace(/"/g, ''))
    },
    async updateStudentInfoById(id, student){
        id = id.replace(/"/g, '')
        return await Student.findByIdAndUpdate(id, student)
    },
    async deleteStudentById(id){
        id = id.replace(/"/g, '')
        return await Student.findByIdAndRemove(id)
    },


}

