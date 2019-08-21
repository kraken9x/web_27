//UI elements

const form = document.querySelector('#search');
const input = document.querySelector('#keyword');
//container
const container = document.querySelector('.result');

const loading = () => {
    const loader = document.createElement('img');
    loader.classList.add('loader');
    loader.src = 'img/loading.gif';
    container.appendChild(loader);
    setTimeout(() => {
        container.removeChild(loader);    
    }, 500);
}

let flag = true;

if (form) {
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let keyword = form.keyword.value;
        console.log(keyword);
        
        
        loading();
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                //loading();
                //console.log('something');
                //console.log(data);
                //console.log(data.items);
                const items = data.items;
                let nextPageToken = data.nextPageToken
                items.forEach(item => {
                    //console.log(item);
                    //row
                    const row = document.createElement('div');
                    row.classList.add('row');

                    //img
                    const divImg = document.createElement('div');
                    divImg.classList.add('col-md-4');
                    const img = document.createElement('img');
                    img.classList.add('img-result');
                    //info
                    const divInfo = document.createElement('div');
                    divInfo.classList.add('col-md-8');

                    //info part
                    const title = document.createElement('a');
                    title.classList.add('title');
                    title.innerHTML = item.snippet.title;
                    title.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                    const description = document.createElement('div');
                    description.classList.add('description');
                    description.innerHTML = item.snippet.description;

                    const publish = document.createElement('div');
                    publish.classList.add('publish');
                    publish.innerHTML = item.snippet.publishedAt;

                    const channelTitle = document.createElement('div');
                    channelTitle.classList.add('channelTitle');
                    channelTitle.innerHTML = item.snippet.channelTitle;

                    //row append
                    row.appendChild(divImg);
                    row.appendChild(divInfo);
                    divImg.appendChild(img);
                    img.src = item.snippet.thumbnails.high.url;

                    divInfo.appendChild(title);
                    divInfo.appendChild(channelTitle);
                    divInfo.appendChild(publish);
                    divInfo.appendChild(description);

                    container.appendChild(row);

                });
                
                let loadMore = () => {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && flag === true) {
                        flag = false;                        
                        
                        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`, {
                            method: 'GET'
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then((data) => {
                                //loading();
                                console.log(data);
                                //console.log(data.items);
                                const items = data.items;
                                nextPageToken = data.nextPageToken;
                                items.forEach(item => {
                                    //console.log(item);
                                    //row
                                    const row = document.createElement('div');
                                    row.classList.add('row');

                                    //img
                                    const divImg = document.createElement('div');
                                    divImg.classList.add('col-md-4');
                                    const img = document.createElement('img');
                                    img.classList.add('img-result');
                                    //info
                                    const divInfo = document.createElement('div');
                                    divInfo.classList.add('col-md-8');

                                    //info part
                                    const title = document.createElement('a');
                                    title.classList.add('title');
                                    title.innerHTML = item.snippet.title;
                                    title.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                                    const description = document.createElement('div');
                                    description.classList.add('description');
                                    description.innerHTML = item.snippet.description;

                                    const publish = document.createElement('div');
                                    publish.classList.add('publish');
                                    publish.innerHTML = item.snippet.publishedAt;

                                    const channelTitle = document.createElement('div');
                                    channelTitle.classList.add('channelTitle');
                                    channelTitle.innerHTML = item.snippet.channelTitle;

                                    //row append
                                    row.appendChild(divImg);
                                    row.appendChild(divInfo);
                                    divImg.appendChild(img);
                                    img.src = item.snippet.thumbnails.high.url;

                                    divInfo.appendChild(title);
                                    divInfo.appendChild(channelTitle);
                                    divInfo.appendChild(publish);
                                    divInfo.appendChild(description);

                                    container.appendChild(row);

                                });
                                flag = true;
                                
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                }


                window.addEventListener('scroll', loadMore);

                if (input) {
                    input.addEventListener('input', (e) => {

                        container.innerHTML = ``;
                        window.removeEventListener('scroll', loadMore);
                    })
                }


                form.keyword.value = '';


            })
            .catch((error) => {
                console.log(error);
            })
        
    })
}