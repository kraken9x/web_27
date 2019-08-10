const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//1.Create schema

const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
})

//2.Create model

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;