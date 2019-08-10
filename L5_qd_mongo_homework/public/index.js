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
        //const id = data.message.id;
        if (questionContent) {
            questionContent.innerHTML = data.message.content;
        }
        if (dislike) {
            dislike.addEventListener('click', () => {
                
                let newDislike = data.message.dislike;
                console.log(data.message.dislike);
                newDislike += 1;
                data.message.dislike = newDislike;
                console.log(data.message.dislike);
                console.log(data);
                fetch('/save-question-db', {
                    method: 'POST', // hoặc 'PUSH'
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        questionContent : data,
                        flag : false,
                        newContent : newDislike
                    }),
                    
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const id = data.message._id;
                    console.log(id);
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
                let newLike = data.message.like;
                console.log(data.message.like);
                newLike += 1;
                data.message.like = newLike;
                console.log(data.message.like);
                console.log(data);
                fetch('/save-question-db', {
                    method: 'POST', // hoặc 'PUSH'
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        questionContent : data,
                        flag : true,
                        newContent : newLike
                    }),
                    
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const id = data.message._id;
                    console.log(id);
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