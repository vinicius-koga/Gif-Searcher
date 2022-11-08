document.querySelector('.searchGif').addEventListener('keypress', searchGif);
document.querySelector('.SearchGifBtn').addEventListener('click', searchGif);
document.querySelector('.searchGif').addEventListener('keypress', checkInput);
document.querySelector('.SearchGifBtn').addEventListener('click', checkInput);

async function searchGif(e) {
    let input = document.querySelector('.searchGif');
    if(input.value != '' && (e.key === 'Enter' || e.type === 'click')){
        let req = await fetch(`https://tenor.googleapis.com/v2/search?q=${input.value}&key=AIzaSyD0Gtagyi2BUKkJ-pwVD8irjgHq3kABbcQ&limit=8`)
        let reqJson = await req.json();

        document.querySelector('.gifs').innerHTML = `<p class="text-center">Searching...</p>`;
        
        showGifs(reqJson);

        function showGifs(list) {
            let html = '';
            for(let i=0; i<list.results.length; i++){
                html += `
                <div class="col-md-4 d-flex justify-content-center align-items-center">                        
                    <img class="img-thumbnail" src="${list.results[i].media_formats.mediumgif.url}" />
                </div>
            `;
            }
            document.querySelector('.gifs').innerHTML = html;
        }
    }
}

function checkInput(e) {
    let input = document.querySelector('.searchGif');
    if(input.value == '' && (e.key === 'Enter' || e.type === 'click')){
        document.querySelector('.gifs').innerHTML = '<p class="text-center">Acho que você precisa escrever algo :)</p>';
    }
    if(input.value != ''){
        document.querySelector('.gifs').innerHTML = '';
    }
}
