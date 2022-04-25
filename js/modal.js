const body = document.getElementsByTagName("body")[0]
const up = document.getElementById('back-to-top')
const footer = document.querySelector('.bottom-footer-background')

onscroll = function(){
    if(window.scrollY+60 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) {

        up.classList.add('upBtn')
        footer.classList.add('footerMb')
        body.style.position = 'relative'

    } else {
        up.classList.remove('upBtn')
        body.style.position = 'static'
    };
};


let input = document.getElementById('search-needle')

function search() {
    let textToSearch = document.getElementById('search-needle').value
    let paragraph = document.querySelectorAll('.value-title')

    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")

    let pattern = new RegExp(`${textToSearch}`, "gi");


    paragraph.forEach(el => {
        el.innerHTML = el.textContent.
        replace(pattern, match => `<span class="markSpan">${match}</span>`)
    })

}

input.addEventListener('input', (e) => {
    search()
});

