window.onload = () => {
    
    const namePlayer1 = document.querySelector('#player-1');
    const namePlayer2 = document.querySelector('#player-2');
    const namePlayer3 = document.querySelector('#player-3');
    const namePlayer4 = document.querySelector('#player-4');

    const submit = document.querySelector('.btn');

    if (submit) {
        submit.addEventListener('click', () => {
            fetch('/create-board', {
                method: 'POST', // hoặc 'PUSH'
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    namePlayer1: namePlayer1.value,
                    namePlayer2: namePlayer2.value,
                    namePlayer3: namePlayer3.value,
                    namePlayer4: namePlayer4.value
                }),
                
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                window.location.href = `/games/${data.data._id}`        
        
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            })
        })
    }



}