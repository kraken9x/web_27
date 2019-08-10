//------------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////
//Web server

//Check npm: npm -v

//Khoi tao 1 project voi npm: npm init

//Moi 1 project chi co duy nhat 1 file package.json
//package.json la file chua cac thong tin ve project, các dependencies(các thư viện cài đặt ngoài
//ngoài được cài đặt và sử dụng)




//////////////////////////////////////////
//ExpressJs -- Tạo webserver

//install thư viện: npm i [tên thư viện] (phải đang cd vào đúng thư mục project)
//Bản chất khi cài 1 thư viện thì là lấy toàn bộ source code về để sử dụng
//Khi install xong thì có thư mục được tạo là node modules (chứa toàn bộ source code đã download về)


//khi commit thì không bao giờ commit node module.
//thêm file .gitignore để thêm tên các file không commit lên git

// const express = require('express');
// const app = express();
// const path = require('path');
// '/': address
// method: get/post/put/delete : 4 method trên web được sử dụng nhiều nhất

// get: người dùng muốn lấy dữ liệu về dưới dạng đường dẫn
// post: frontend muốn tạo thông tin mới trong db
// put: sửa một bản ghi, data đã có
// delete: xóa một dữ liệu đã có

// method + address phải là duy nhất

// app.get('/', (req, res) => {
//     //flow cơ bản cho một /
//     //validate

//     //


//   res.send('Hello World');
// })

// app.get('/ask', (req, res) => {
//Cách 1:
//res.sendFile(`${__dirname}/public/ask.html`);
//Cách 2:
//thư viện path
// res.sendFile(path.resolve(__dirname, './public/ask.html'));
// //dirname = current working folder
// })

//Public folder: là thư mục chứa tất cả các code chạy trên máy người dùng
//Tất cả các nội dung trong public folder không cần phải viết router

// app.use(express.static('public'))




// app.listen(3000, (err) => {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('server listen on port 3000 ...');
//     }
// });

//------------------------------------------------------------------------------------------------------------------------
//L3


//------------------------------------------------------------------------------------------------------------------------
//L4

//fetch API


//Hứng request
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model');

//Test connect
//{dia chi ket noi}, {option}, {callback function}
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

    //dùng body parser - body parser là miđllware của express

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'));
    })

    app.get('/ask', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/ask.html'));
    })

    app.post('/create-question', (req, res) => {
      //dùng nhiều nhất là res.json()
      // res.json({
      //   success: true,
      // });

      // trả về text
      //res.send()

      //trả về file
      //res.sendFile()

      //server trả về gì thì phải khớp với response trả về phần front-end
      //express không hỗ trỡ đọc thông tin từ body => phải dùng thư
      //viện bên ngoài đọc body
      // dùng thư viện body parser
      // npm i body-parser

      //console.log(req.body);
      //sau đó lưu vào cơ sở dữ liệu
      //fake tạm cơ sở dữ liệu

      //định nghĩa 1 câu hỏi
      //content, like, dislike, id của question
      const newQuestion = {
        content: req.body.questionContent //khong can truyen like dislike vi da de default
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



















      // fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
      //   if (error) {
      //     // search status code 200 - thành công, 400 - lỗi người dùng
      //     // 500 - lỗi server
      //     res.status(500).json({
      //       sucess: false,
      //       message: error.message
      //     })
      //   } else {
      //     // json
      //     const questionsArr = JSON.parse(data);
      //     questionsArr.push(newQuestion);

      //     fs.writeFile('./data.json', JSON.stringify(questionsArr), (err) => {
      //       if (err) {
      //         res.status(500).json({
      //           sucess: false,
      //           message: error.message
      //         })
      //       } else {
      //         res.status(201).json({
      //           sucess: true,
      //           data: newQuestion
      //         })
      //       }
      //     });
      //   }

      // })
    })

    app.get('/questions/:questionId', (req, res) => {
      // :abc => đây là param, thành phần của đường dẫn mà có biến có thể thay đổi
      // req.params.questionId

      res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
    })

    app.get('/get-question-by-id', (req, res) => {
      //query
      //req.query
      const questionId = req.query.questionId;
      //console.log(questionId);
      let questionContent = undefined;
      fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
          res.status(500).json({
            sucess: false,
            message: error.message
          })
        } else {
          const questionsArr = JSON.parse(data);
          for (let i = 0; i < questionsArr.length; i++) {
            const element = questionsArr[i];
            //console.log(element.id);
            if (element.id == questionId) {
              questionContent = element;
              //console.log(questionContent);
              res.status(201).json({
                sucess: true,
                questionContent: questionContent
              })
            }
          }

        }

      })

    })
    app.get('/get-random-question', (req, res) => {
      fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
          res.status(500).json({
            sucess: false,
            message: error.message
          })
        } else {
          const questionsArr = JSON.parse(data);
          const randomI = Math.floor(Math.random() * questionsArr.length)
          const randomQuestion = questionsArr[randomI];

          res.status(201).json({
            sucess: true,
            message: randomQuestion
          })
        }

      })


    })

    app.post('/save-question-db', (req, res) => {
      const newData = req.body.questionContent.message;
      const id = req.body.questionContent.message.id;
      let index = undefined;
      fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
          res.status(500).json({
            sucess: false,
            message: error.message
          })
        } else {
          const questionsArr = JSON.parse(data);
          for (let i = 0; i < questionsArr.length; i++) {
            const element = questionsArr[i];
            if (element.id == id) {
              questionsArr[i] = newData;
              index = i;
            }

          }
          console.log(questionsArr[index]);
          fs.writeFile('./data.json', JSON.stringify(questionsArr), (err) => {
            if (err) {
              res.status(500).json({
                sucess: false,
                message: error.message
              })
            } else {
              res.status(201).json({
                sucess: true,
                data: newData
              })
            }
          });
        }

      })
    })




    // Để kết nối đến DB từ ngoài thì dùng thư viện Mongoose


    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('server listen on port 3000 ...');
      }
    });
  }
});

