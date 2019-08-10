window.onload = () => {
    const dislike = document.getElementById('dislike');
    const like = document.getElementById('like');

    fetch('/get-random-question', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        const questionContent = document.querySelector('.question-content');
        const id = data.message.id;
        if (questionContent) {
            questionContent.innerHTML = data.message.content;
        }
        if (dislike) {
            dislike.addEventListener('click', () => {
                data.message.dislike += 1;
                fetch('/save-question-db', {
                    method: 'POST', // hoặc 'PUSH'
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        questionContent : data,
                    }),
                    
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const id = data.data.id;
                    console.log(data);
                    window.location.href = `/questions/${id}`;
                })
                .catch((error) => {
                    
                    console.log(error);
                    window.alert(error.message);
                })

            })
        }
        if (like) {
            like.addEventListener('click', () => {
                data.message.like += 1;
                fetch('/save-question-db', {
                    method: 'POST', // hoặc 'PUSH'
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        questionContent : data,
                    }),
                    
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const id = data.data.id;
                    console.log(data);
                    window.location.href = `/questions/${id}`;
                })
                .catch((error) => {                    
                    console.log(error);
                    window.alert(error.message);
                })

            })
        }


    })
    .catch((error) => {
        console.log(error);
        window.alert(error.message);
    })

}