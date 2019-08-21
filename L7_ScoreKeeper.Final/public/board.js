window.onload = () => {
    
    const pathName = window.location.pathname;
    const pathNameParts = pathName.split('/');
    const gameId = pathNameParts[pathNameParts.length - 1];

    fetch(`/get-board-by-id?gameId=${gameId}`, {
        method: 'GET'
    })
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {        
        let totalPointPlayer1 = data.data.player1.score.totalScore;
        let totalPointPlayer2 = data.data.player2.score.totalScore;
        let totalPointPlayer3 = data.data.player3.score.totalScore;
        let totalPointPlayer4 = data.data.player4.score.totalScore;
        
        let sos = totalPointPlayer1 + totalPointPlayer2 + totalPointPlayer3 + totalPointPlayer4;
        const result = document.querySelector('.result');
        if (result) {
            
            console.log(data);
            const content = `
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">${data.data.player1.name}</th>
                            <th scope="col">${data.data.player2.name}</th>
                            <th scope="col">${data.data.player3.name}</th>                            
                            <th scope="col">${data.data.player4.name}</th>
                        </tr>
                    </thead>
                    <tbody id = 'table-body'>
                        <tr class="table-danger">
                            <th scope="row">Sum of Score(${sos})</th>
                            <td id='${data.data.player1.id}'>${totalPointPlayer1}</td>
                            <td id='${data.data.player2.id}'>${totalPointPlayer2}</td>
                            <td id='${data.data.player3.id}'>${totalPointPlayer3}</td>                            
                            <td id='${data.data.player4.id}'>${totalPointPlayer4}</td>
                        </tr>
                        
                        
                        
                    </tbody>
                </table>
            `;
            
            result.insertAdjacentHTML('beforeend',content);
        }

        const tbody = document.getElementById('table-body');

        const createRound = (i, roundNumb, roundTotalScoreP1, roundTotalScoreP2, roundTotalScoreP3, roundTotalScoreP4, id1, id2, id3, id4) => {
            if (!roundTotalScoreP1 || !roundTotalScoreP2 || !roundTotalScoreP3 || !roundTotalScoreP4) {
                roundTotalScoreP1 = 0;
                roundTotalScoreP2 = 0;
                roundTotalScoreP3 = 0;
                roundTotalScoreP4 = 0;
            }
            const round = `
                <tr class = 'row-parent'>
                    <th scope="row">Round ${i+1}</th>
                    <td>
                        <input class="point ${roundNumb}" type="number" name="${id1}" value = '${roundTotalScoreP1}'>
                    </td>
                    <td>
                        <input class="point ${roundNumb}" type="number" name="${id2}" value = '${roundTotalScoreP2}'>
                    </td>
                    <td>
                        <input class="point ${roundNumb}" type="number" name="${id3}" value = '${roundTotalScoreP3}'>
                    </td>
                    <td>
                        <input class="point ${roundNumb}" type="number" name="${id4}" value = '${roundTotalScoreP4}'>
                    </td>
                </tr>
            `;


            tbody.insertAdjacentHTML('beforeend',round);  
        }
        if(tbody){

            for (let i = 0; i < data.data.numberOfRound; i++) {      

                createRound(i, i+1, data.data.player1.score.round[i], data.data.player2.score.round[i], data.data.player3.score.round[i], data.data.player4.score.round[i], data.data.player1.id, data.data.player2.id, data.data.player3.id, data.data.player4.id);
                   
            }
        }


        const saveData = (data) => {
            fetch('/update', {
                method: 'POST', // hoặc 'PUSH'
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    data : data
                }),
                
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                
                console.log(error);
                window.alert(error.message);
            })
        }

        
        if (tbody) {
            tbody.addEventListener('keyup', (event) => {
                if (event.keyCode === 13 && event.target.classList.contains('point') === true) {
                    console.log('somthing');
                    let currentRound = event.target.classList[1];
                    console.log(currentRound);
                    currentRound = Number(currentRound);
                    let playerName = event.target.name;
                    
                    switch (playerName) {
                        case `${data.data.player1.id}`:
                            totalPointPlayer1 += Number(event.target.value);
                            data.data.player1.score.totalScore = totalPointPlayer1;
                            document.getElementById(data.data.player1.id).innerHTML = totalPointPlayer1;
                            data.data.player1.score.round[currentRound-1] += Number(event.target.value);
                            data.data.player1.score.round[currentRound] = 0;
                            saveData(data);
                            break;
                        case `${data.data.player2.id}`:
                            totalPointPlayer2 += Number(event.target.value);
                            data.data.player2.score.totalScore = totalPointPlayer2;
                            document.getElementById(data.data.player2.id).innerHTML = totalPointPlayer2;
                            data.data.player2.score.round[currentRound-1] += Number(event.target.value);
                            data.data.player2.score.round[currentRound] = 0;
                            saveData(data);
                            break;
                        case `${data.data.player3.id}`:
                            totalPointPlayer3 += Number(event.target.value);
                            data.data.player3.score.totalScore = totalPointPlayer3;
                            document.getElementById(data.data.player3.id).innerHTML = totalPointPlayer3;
                            data.data.player3.score.round[currentRound-1] += Number(event.target.value);
                            data.data.player3.score.round[currentRound] = 0;
                            saveData(data);
                            break;
                        case `${data.data.player4.id}`:
                            totalPointPlayer4 += Number(event.target.value);
                            data.data.player4.score.totalScore = totalPointPlayer4;
                            document.getElementById(data.data.player4.id).innerHTML = totalPointPlayer4;
                            data.data.player4.score.round[currentRound-1] += Number(event.target.value);
                            data.data.player4.score.round[currentRound] = 0;
                            saveData(data);
                            break;
                    }

                    
                    console.log(data);
                }
            })
        }

        const btn = document.querySelector('.btn');
        if (btn) {
            let i = data.data.numberOfRound;
            btn.addEventListener('click', (event) => {                
                createRound(i, data.data.numberOfRound + 1, data.data.player1.score.round[i], data.data.player2.score.round[i], data.data.player3.score.round[i], data.data.player4.score.round[i], data.data.player1.id, data.data.player2.id, data.data.player3.id, data.data.player4.id);
                i++;
                data.data.numberOfRound = i;
                saveData(data);
                
            })
        }

    })
    .catch((error) => {
        console.log(error);
        window.alert(error.message);
    })


}

