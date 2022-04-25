

const arr = [
    {id: 1, title: 'Ziedu pušķis “Elegance”', subtitle: 'Kategorija: Ziedu pušķis', price: '€ 19,00'},
    {id: 2, title: 'Ziedu pušķis “Romance”', subtitle: 'Kategorija: Ziedu pušķis', price: '€ 19,00'},
    {id: 3, title: 'Ziedu pušķis “Nr.50”', subtitle: 'Kategorija: Ziedu pušķis', price: '€ 19,00'},
    {id: 4, title: 'Ziedu pušķis “Nr.55”', subtitle: 'Kategorija: Ziedu pušķis', price: '€ 19,00'},
    {id: 5, title: 'Ziedu pušķis “Nr.54”', subtitle: 'Kategorija: Ziedu pušķis', price: '€ 19,00'},
]


const valueList = document.querySelector('.value-list');

const variant = document.querySelectorAll('.variant');

const valueTitle = document.querySelectorAll('.value-title');
const body = document.getElementsByTagName("body")[0]
const up = document.getElementById('back-to-top')
const footer = document.querySelector('.bottom-footer-background')

onscroll = function(){
    if(window.scrollY+60 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) {

        // body.style.marginBottom = '-60px'
        up.classList.add('upBtn')
        footer.classList.add('footerMb')
        body.style.position = 'relative'

    } else {
        up.classList.remove('upBtn')
        // footer.classList.remove('footerMb')
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

