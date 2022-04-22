window.addEventListener('load', function() {
    const gallery = document.querySelector('.gallery')
    const wrapper = document.querySelector('.gallery-wrap')
    const allImages = document.querySelectorAll('.just-img')

    let clone = gallery.cloneNode(true)
    clone.classList.add('compact-gallery-2')
    clone.classList.remove('compact-gallery-1')


    allImages.forEach((el, index) => {
        const src = clone.children[1].children[index].children[0].getAttribute('src')
        clone.children[1].children[index].setAttribute('href', `${src}`)
        wrapper.appendChild(clone)
    })


    baguetteBox.run('.compact-gallery',{
        animation:'slideIn',
        buttons: true
    });
})


const justImg = document.querySelectorAll('.just-img')
const thumbs = document.getElementById('thumbs')
const count = document.querySelector('.img-count')

count.innerHTML = 0

if(thumbs.children.length > 6) {
    count.innerHTML = `+${thumbs.children.length - 5}`
}

justImg.forEach((el, index) => {
    if(index + 1 > 6) {
        el.classList.add('d-none')
    }
})


let parent = document.querySelector('.just-imgs');
let menuItem = parent.querySelectorAll('.just-img');
let largeImg = document.getElementById('largeImg');




parent.addEventListener('click', (event) => {
    let target = event.target;
    let parentEl = target.parentElement
    let getSrc = target.getAttribute('src')

    if(parentEl.classList.contains('just-img')) {
        for(let i = 0; i < menuItem.length; i++) {
            menuItem[i].classList.remove('active-img');
        }
        parentEl.classList.add('active-img');
    }

    if(getSrc) {
        return largeImg.src = getSrc
    }

});


$(document).ready(function(){
    $(".navbar-toggler").click(function(){
        $(".hamburger").toggleClass("is-active");
    });
});


// window.addEventListener ("touchmove", function (event) { event.preventDefault (); }, {passive: false});

