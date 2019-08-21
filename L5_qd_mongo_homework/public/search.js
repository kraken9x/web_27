window.onload = () => {
    document.querySelector('.search').addEventListener('submit', (e) => {
        e.preventDefault();

        //get key words

        const searchKeyword = document.querySelector('#search').value;

        //send fetch to server;

        fetch(`/search-question?keyword=${searchKeyword}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.data);
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message)
            })

    })
}