const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const GameSchema = new mongoose.Schema({
    player1: {
        id : {
            type : Number,
            default :1,
        },
        score :{
            round: {
                type: Array,
                default: [0],
            },
            totalScore: {                    
                type: Number,
                default : 0,
            }
        },
        name : {
            type : String,
        }
    },
    player2: {
        id : {
            type : Number,
            default :2,
        },
        score :{
            round: {
                type: Array,
                default: [0],
            },
            totalScore: {                    
                type: Number,
                default : 0,
            }
        },
        name : {
            type : String,
        }
    },
    player3: {
        id : {
            type : Number,
            default :3,
        },
        score :{
            round: {
                type: Array,
                default: [0],
            },
            totalScore: {                    
                type: Number,
                default : 0,
            }
        },
        name : {
            type : String,
        }
    },
    player4: {
        id : {
            type : Number,
            default :4,
        },
        score :{
            round: {
                type: Array,
                default: [0],
            },
            totalScore: {                    
                type: Number,
                default : 0,
            }
        },
        name : {
            type : String,
        }
    },
    numberOfRound: {                    
        type: Number,
        default : 1,
    }
});

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;