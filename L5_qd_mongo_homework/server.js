const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model');


mongoose.connect('mongodb://localhost:27017/quyetde', { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(error);
    process.exit();
  } else {
    //start app
    //connect to mongoDB success
    console.log('connect to mongoDB success');
    const bodyParser = require('body-parser');
    app.use(express.static('public'))
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'));
    })
    app.get('/ask', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/ask.html'));
    })
    app.post('/create-question', (req, res) => {
   
      const newQuestion = {
        content: req.body.questionContent 
      };

      //insert to db

      QuestionModel.create(newQuestion, (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          })
        }else{
          console.log(data);
          res.status(201).json({
            success: true,
            data: {
              ...data._doc,
              id: data._doc._id
            },
          })
        }
      });

    })

    app.get('/questions/:questionId', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
    })

    app.get('/get-question-by-id', (req, res) => {
      //query
      //req.query
      const questionId = req.query.questionId;
      //console.log(questionId);
      QuestionModel.findById(questionId, (error, data) => {
          if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
          }else{
            if (!data) {
              res.status(404).json({
                success: false,
                message: `question not found`
              })  
            }else{
              res.status(200).json({
                  success: true,
                  message: data
              })
            }
          }
      });

    })
    // app.get('/get-random-question', (req, res) => {
    //     QuestionModel.find({})
    //         .then(data => {
    //             //console.log(data);
    //             //console.log(data.length);
    //             const randomI = Math.floor(Math.random() * data.length);
    //             const randomQuestion = data[randomI];
    //             //console.log(randomQuestion);
    //             res.status(201).json({
    //                 sucess: true,
    //                 message: randomQuestion
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 success: false,
    //                 message: err.message
    //             })
    //         })


    // })
    app.get('/get-random-question', (req, res) => {
      QuestionModel.aggregate([
        {$sample: {size: 1}}
      ], (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          })
        }else{
          const selectedQuestion = data[0];
          res.status(200).json({
            success: true,
            message: selectedQuestion
          })
        }
      })


    })

    app.post('/save-question-db', (req, res) => {
        const newData = req.body.questionContent.message;
        console.log(req.body);
        const id = req.body.questionContent.message._id;
        const newContent = req.body.newContent;
        console.log(newContent)
        const flag = req.body.flag;
        
        if (flag === false) {                
            QuestionModel.findByIdAndUpdate(id, {dislike : newContent}, {new : true}, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                }else{
                    console.log(data);
                    res.status(200).json({
                        success: true,
                        message: data
                    })
                }
            })    
        }else{
            QuestionModel.findByIdAndUpdate(id, {like : newContent}, {new : true}, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                }else{                  
                    console.log(data);
                    res.status(200).json({
                        success: true,
                        message: data
                    })
                }
            }) 
        }

    })

    app.get('/search', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/search.html'));
    })


    app.get('/search-question', (req, res) => {
      const keyword = req.query.keyword;

      QuestionModel.find({
        content : {$regex : keyword, $options: 'i'}
      }, (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          })
        }else{
          res.status(200).json({
            success: true,
            data: data
          })
        }
      })
    })
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('server listen on port 3000 ...');
      }
    });
  }
});
