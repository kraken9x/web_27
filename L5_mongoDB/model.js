const mongoose = require('mongoose');
//1.Create schema
const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0 // Gia tri cua default fai phu hop voi kieu du lieu minh dinh nghia
    },
    dislike: {
        type: Number,
        default: 0 // Gia tri cua default fai phu hop voi kieu du lieu minh dinh nghia
    }    
})
//2.Create model

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
