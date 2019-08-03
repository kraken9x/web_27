// console.log('Hello World!');

//buffer
//
//crypto
//file system
//http
//url
//os
//path
//query string


//////////////////////////////////////////
//File system

//fs.readFile
//fs.writeFile
//fs.watch === tương tự addEventListener
//Khi file có dữ liệu thay đổi thì hàm callback được gọi.

const fs = require('fs');

// fs.readFile('./data.txt', {encoding: 'utf-8'}, (err, data) => {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log(data);
//         fs.writeFile('./outputFile.txt', `This is what we know about avocado: ${data}`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// })

fs.readFile('./data.txt', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
        console.log(err);
    }else{
        console.log(data);
        fs.writeFile('./data.txt', `This is what we know about avocado: ${data}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
})

fs.watchFile('./data.txt', (current, previous) => {
    if (previous) {        
        console.log('File Change');
        fs.unwatchFile('./data.txt');
    }else{
        fs.unwatchFile('./data.txt');
    }
})



