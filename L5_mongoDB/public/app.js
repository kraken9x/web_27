window.onload = () => {

    const mainForm = document.querySelector('.main-form');
    const textArea = document.querySelector('#ask-question');
    if (textArea) {
        console.log(textArea);
        textArea.addEventListener('input', (e) => {
            const letter = document.querySelector('.letter');
            if (letter && textArea.value.length <= 200) {
                letter.innerHTML = 200 - textArea.value.length;
            }
        })
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            //send request lên server 
            //Trong request cần yêu cầu 2 thông tin
            //- Tạo 1 câu hỏi mới.
            //- Gửi nội dung câu hỏi lên server

            const textAreaValue = document.querySelector('.question-content').value;


            fetch('/create-question', {
                method: 'POST', // hoặc 'PUSH'
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    questionContent : textAreaValue,
                }),
                
            })
                .then((response) => {
                    //response khi thành công, kết quả trình duyệt trả về cho mình
                    //response.json() - dùng khi dữ liệu server trả về dưới dạng JSON
                    //response.text() - dùng khi dữ liệu server trả về dưới dạng string
                    return response.json(); //-> kết quả trôi xuống thằng .then() tiếp theo (vì response.json cũng là 1 thao tác async)

                })
                .then((data) => {
                    //handle dữ liệu data trả về
                    //console.log(data);
                    const id = data.data.id;
                    window.location.href = `/questions/${id}`;
                })
                .catch((error) => {
                    //khi thất bại thì nhảy xuống .catch
                    console.log(error);
                    window.alert(error.message);
                })
            // '': Địa chỉ gửi đến (có thể là đường dẫn trang web bên ngoài, hoặc là gửi đến chinihs mình
            // dùng đường dẫn tương đối)
            // {}: đây là method
        })
    }
}


