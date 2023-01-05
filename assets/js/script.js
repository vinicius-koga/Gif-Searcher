document.querySelector('.searchGif').addEventListener('keypress', searchGif);
document.querySelector('.SearchGifBtn').addEventListener('click', searchGif);
document.querySelector('.searchGif').addEventListener('keypress', checkInput);
document.querySelector('.SearchGifBtn').addEventListener('click', checkInput);

function checkInput(e) {
    let input = document.querySelector('.searchGif');
    if (input.value == '' && (e.key === 'Enter' || e.type === 'click')) {
        document.querySelector('.gifs').innerHTML = '<p class="text-center">Digite algo :)</p>';
    }
    if (input.value != '') {
        document.querySelector('.gifs').innerHTML = '';
    }
}

async function searchGif(e) {
    let input = document.querySelector('.searchGif');
    if (input.value != '' && (e.key === 'Enter' || e.type === 'click')) {
        document.querySelector('.gifs').innerHTML = `<p class="text-center">Procurando...</p>`;

        let req = await fetch(`https://tenor.googleapis.com/v2/search?q=${input.value}&key=AIzaSyD0Gtagyi2BUKkJ-pwVD8irjgHq3kABbcQ&limit=8`)
        let reqJson = await req.json();

        showGifs(reqJson);

        function showGifs(list) {
            let html = '';
            for (let i = 0; i < list.results.length; i++) {
                html += `
                <div class="col-md-4 d-flex justify-content-center align-items-center gif">                        
                    <img class="img-thumbnail gifImg" src="${list.results[i].media_formats.tinygif.url}" data-bs-toggle="modal" data-bs-target="#gifModal" style="cursor: pointer;"/>
                </div>
            `;
            }
            document.querySelector('.gifs').innerHTML = html;
        }
    }
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('gifImg')){
        let image = e.target;
        let modalBody = document.querySelector('#gifModal .modal-body');
        let modalFooter = document.querySelector('#gifModal .modal-footer');

        modalBody.innerHTML = `<img src="${image.src}" style="width: 100%;">`;
        modalFooter.innerHTML = `
            <a href="${image.src}" class="mx-auto" download="GIF" target="_blank">
                <button class="btn btn-outline-primary">
                    Baixar
                </button>
            </a>`
    }
})