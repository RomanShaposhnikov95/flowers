window.addEventListener('load', () => {
    const swiperModal2 = document.querySelectorAll('.swiper-slide-modal')
    const swiperSlide = document.getElementById('swiper-slide-block');
    const swiperThumb2 = document.getElementById('swiper-thumb');
    const swiperSlideModal = document.querySelectorAll('.swiper-slide-modal')


    swiperModal2.forEach((el, index) => {
        const src = swiperModal2[index].children[0].children[0].getAttribute('data-src')

        const slide = document.createElement('div')
        let classesToAdd = [ 'swiper-slide', 'minimum-height' ];
        slide.classList.add(...classesToAdd)

        const slideImg = document.createElement('img')
        slideImg.classList.add('swiper-slide-img')
        slideImg.src = src

        slide.appendChild(slideImg)
        swiperSlide.appendChild(slide)

        let devWidth = $(window).width();

        const swiperThumbBtn = document.createElement('div')
        let classesToAddThumb = [ 'swiper-slide', 'swiper-slide-thumbs'];
        let lastThumb = [ 'swiper-slide', 'swiper-slide-thumbs','last-thumb'];
        swiperThumbBtn.classList.add(...classesToAddThumb)
        swiperThumbBtn.setAttribute("id", `${index}`);

        let value = null

        if(devWidth > 700) {
            value = 5
        } else if (devWidth > 540) {
            value = 3
        } else {
            value = 2
        }

        if(index === value) {
            swiperThumbBtn.classList.add(...lastThumb)
            swiperThumbBtn.addEventListener('click', () => {
                openModal()
            })

            const num = document.createElement('div')
            num.classList.add('num')
            num.innerHTML = `+ ${swiperSlideModal.length > value ? swiperSlideModal.length - value : ''}`

            swiperThumbBtn.appendChild(num)
        }


        const thumbImg = document.createElement('img')
        thumbImg.src = src

        swiperThumbBtn.appendChild(thumbImg)
        swiperThumb2.appendChild(swiperThumbBtn)

    })



    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: `${swiperSlideModal.length >= 6 ? '6' : swiperSlideModal.length}`,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            540: {
                slidesPerView: 4,
                spaceBetween: 10
            },

            700: {
                slidesPerView: `${swiperSlideModal.length >= 6 ? '6' : swiperSlideModal.length}`,
                spaceBetween: 10
            }
        },
        allowTouchMove: false,
        autoHeight: true, //enable auto height,
        allowSlideNext: false
    });


    var swiper = new Swiper('.swiper-container-main', {
        autoHeight: true, //enable auto height

        //runCallbacksOnInit: true,
        observer: true,
        observeParents: true,
        observeChildren: true,
        spaceBetween: 0,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        preloadImages: false,
        // Enable lazy loading
        lazy: true,
        lazy: {
            loadPrevNext: true,
        },

        keyboard: {
            enabled: true,
        },

        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
        },
        loop: true,
        thumbs: {
            swiper: galleryThumbs
        }

    });

// swiper - modal
    var swiperModal = new Swiper('.swiper-container-modal', {
        observer: true,
        observeParents: true,
        observeChildren: true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        zoom: {
            maxRatio: 2,
            toggle: true,  // enable zoom-in by double tapping slide
        },
        loop: true,
        preloadImages: false,
        // Enable lazy loading
        lazy: true,
        lazy: {
            loadPrevNext: true,
            //loadOnTransitionStart: true,
        },


        effect: 'coverflow',
        coverflowEffect: {
            rotate: 60,
            slideShadows: false,
        },
        loop: true,


    });


// Create a Modal With HTML, CSS & JavaScript (https://www.youtube.com/watch?v=6ophW7Ask_0)
    const nonModalGalleryImgContainer = document.querySelector(
        '.swiper-container-main'
    );
    const nonModalGalleryImgWrapper = nonModalGalleryImgContainer.querySelector(
        '.swiper-wrapper'
    );
// Get modal element
    var modal = document.getElementById('simpleModal');
// Get open modal button
    var modalBtn = document.querySelectorAll('.swiper-slide-img'); // select all swiper-slides (outside modal)
// close button
    var closeBtn = document.getElementsByClassName('closeBtn')[0]; // returns an array... just get first one (only one element with this class)

    function openModal() {
        // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
        // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed'; // prevents scrolling
        document.body.style.top = `-${window.scrollY}px`; // subtract scroll top, add to body styles

        let swiperIndexPos = swiper.activeIndex;
        swiperModal.slideTo(swiperIndexPos);
        swiperModal.lazy.load(); // need to initailize lazy load if modal opened
        modal.style.display ='block';
        swiper.keyboard.disable();
        swiperModal.keyboard.enable();
        document.addEventListener('keydown', closeModalWithKeyboard);
    }

    modalBtn.forEach(element => {
        element.addEventListener('click', openModal); // add an click event listener for each swiper-slide (outside the modal)
    })

    function openModalWithKeyboard(event) {
        if (event.key === 'Enter') {
            openModal();
        }
    }

// open modal if non-modal image wrapper is in focus and enter is hit
    nonModalGalleryImgContainer.addEventListener('keydown', openModalWithKeyboard);


    function closeModal() {
        // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
        // When the modal is hidden...
        const scrollY = document.body.style.top; // retrieve scroll location
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        let swiperModalIndexPos = swiperModal.activeIndex;
        swiper.slideTo(swiperModalIndexPos);
        modal.style.display = 'none';
        swiperModal.keyboard.disable();
        swiper.keyboard.enable();
        document.removeEventListener('keydown', closeModalWithKeyboard);
    }

// Listen for close click
    closeBtn.addEventListener('click', closeModal);

// close modal using Escape key
    function closeModalWithKeyboard(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
})


$(document).ready(function(){
    $(".navbar-toggler").click(function(){
        $(".hamburger").toggleClass("is-active");
        $(".hamburger-wrap").toggleClass("is-active-color");
    });
});