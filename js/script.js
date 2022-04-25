/*resize*/
var meta_viewport = $('meta[name="viewport"]');
function test_viewport() {
    var res = true;
    if (window.screen.availWidth > 360) {
        meta_viewport.attr('content', 'width=device-width, initial-scale=1, maximum-scale=1');
        res = true;
    } else {
        meta_viewport.attr('content', 'width=360, user-scalable=no, minimal-ui');
        res = false;
    }
    return res;
}
function change_viewport() {
    test_viewport();
    $(window).on('resize', function () {
        test_viewport();
    });
};

$(document).ready(function () {
    change_viewport();
    $(window).trigger('resize');
    Search.init();


    // Слайдер
    initSlider();
    initFilters();

    $('.js-presents-slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrow: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrow: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrow: false
                }
            }
        ]
    });

    $('.js-presents-slider2').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrow: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrow: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrow: false
                }
            }
        ]
    });

    $('.modal').on('shown.bs.modal', function (e) {
        $('.js-presents-slider2').slick("setPosition", 0);
    });

    $('.js-presents-slider-right').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrow: false
    });

    $('.product__quantity-up').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.product__quantity-down').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });



    $(function () {
        try {
            $("body select[name='select-color']").msDropDown();
        } catch (e) {
            // alert(e.message);
        }
    });

    $(function () {
        if ($("#datepicker").length < 1) {
            return;
        }

        $("#datepicker").datetimepicker({
            format: 'DD.MM.YYYY HH:mm',
            debug: false,
            minDate: moment(),
            allowInputToggle: true,
        }).on('keypress paste', function (e) {
            e.preventDefault();
            return false;
        });
    });

    $('[data-toggle="tooltip"]').tooltip();


    var win = $(window);
    var marker = $('.cart__information');

    if(marker.length > 0){
        $(window).scroll(function () {
            if (win.scrollTop() + win.height() / 100 >= marker.offset().top) {
                $('.cart__information').addClass('show');
            } else {
                $('.cart__information').removeClass('show');
            }
        });
    }

    $('#FAQList .card').on('show.bs.collapse', function () {
        $(this).addClass('opening');
        $(this).removeClass('closed');
        $(this).removeClass('closing');

    });
    $('#FAQList .card').on('shown.bs.collapse', function () {
        $(this).addClass('open');
        $(this).removeClass('closed');
        $(this).removeClass('closing');

    });
    $('#FAQList .card').on('hidden.bs.collapse', function () {
        $(this).addClass('closed');
        $(this).removeClass('opening');
        $(this).removeClass('open');

    });
    $('#FAQList .card').on('hidden.bs.collapse', function () {
        $(this).addClass('closing');
        $(this).removeClass('opening');
        $(this).removeClass('open');

    });

    $('.related-field-trigger').on('change', function () {
        var allRelatedFields = $('.' + $(this).data('all-related-field-key'));
        var thisRelatedField = $('#' + $(this).data('this-related-field-key'));

        allRelatedFields.hide();
        thisRelatedField.show();
    });

    // disable closing dropdown on clicking inside
    $('.dropdown-menu.no-close').on('click', function(event){
        var events = $._data(document, 'events') || {};
        events = events.click || [];
        for(var i = 0; i < events.length; i++) {
            if(events[i].selector) {

                //Check if the clicked element matches the event selector
                if($(event.target).is(events[i].selector)) {
                    events[i].handler.call(event.target, event);
                }

                // Check if any of the clicked element parents matches the
                // delegated event selector (Emulating propagation)
                $(event.target).parents(events[i].selector).each(function(){
                    events[i].handler.call(this, event);
                });
            }
        }
        event.stopPropagation(); //Always stop propagation
    });

    if ($('#filter-category').length > 0) {
        console.log('mobile');
        if (window.innerWidth < 768) {
            $('#filter-category').removeClass('show').addClass('collapse');
            $('[href="#filter-category"]').addClass('collapsed').data('aria-expanded', false);
        }
    }
});

function initMap(params) {
    if (typeof google == 'undefined') {
        return;
    }
    var gm = google.maps;

    if ($(params.map).length < 1) {
        return;
    }

    map = new google.maps.Map(params.map, {
        zoom: params.zoom,
        center: new gm.LatLng(params.center.lat, params.center.lng),
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });

    map.scrollwheel = false;

    var bounds = new google.maps.LatLngBounds();

    for (var i in params.markers) {
        if (params.markers.hasOwnProperty(i)) {
            var element = params.markers[i];


            var m = new google.maps.Marker({
                position: new gm.LatLng(
                    element.position.lat,
                    element.position.lng
                ),
                icon: element.icon,
                map: map,
            });

            bounds.extend(m.getPosition());
        }
    }

    map.fitBounds(bounds);
}

var Search = {
    from: null,
    init: function () {
        this.form = $("#SearchForm");
        if (!this.form.length) return;

        var link = this.form.data('autocomplete-src');
        var timeout;

        $("#search-needle").keyup(function () {
            if (timeout) clearTimeout(timeout);

            var q = $(this).val();
            if (q.length >= 2) {
                timeout = setTimeout(function () {
                    $.ajax({
                        type: "GET",
                        url: link + '&q=' + q,
                        success: function (response) {
                            $('#autocomplete').addClass('showResult');
                            $('#value-list').html(response);
                        }
                    });
                }, 500);
            }
        });
    }
}


function initSlider() {
    $('.slider-for').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        focusOnSelect: true
    });
}



$(function () {
    $(window).scroll(function () {
        let w = $(window).width();
        if ($(this).scrollTop() > 300) {
            if(w <= 768) {
                $('#back-to-top').fadeIn();
                $('#message-btn').fadeIn();
            }
            $('#back-to-top').fadeIn();

        } else {
            if(w <= 768) {
                $('#back-to-top').fadeOut();
                $('#message-btn').fadeOut();
            }
            $('#back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1600);
        return false;
    });
});

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.header__inner').addClass('scrolled');
            $('.header').addClass('scroll-style');
        } else {
            $('.header__inner').removeClass('scrolled');
            $('.header').removeClass('scroll-style');
        }
    });

});


$('.add-to-basket').click(function(
    e
) {
    e.preventDefault();
    var elem = $(this);

    $.ajax({
        type: 'GET',
        url: elem.attr('href'),
        success: function(response) {
            var data = response;
            addToSomething(data, e);
        }
    });
});

function addToSomething(data, e) {
    var added_message_timeout = 5000;
    if (typeof ADDED_MESSAGE_TIMEOUT != 'undefined') {
        added_message_timeout = ADDED_MESSAGE_TIMEOUT;
    }
    var countElement;

    if (data.status != 'success') {
        return false;
    }
    data.class = 'dt-cart';
    countElement = $('.cart-wrap .indicator');

    var message = $('#add-to-cart-message-proto')
        .clone()
        .addClass('add-to-cart-message')
        .attr('id', '');

    message.find('.left a').attr('href', data.pageUrl);
    message.find('.left span').text(data.leftText);
    message.find('.right a').attr('href', data.rightUrl);
    message.find('.name .bold').text(data.name);
    message.find('.image img').attr('src', data.image);
    if (data.prices.new) {
        message.find('.item-price .new-price span').text(data.prices.new);
    } else {
        message.find('.item-price .new-price').remove();
    }
    if (data.prices.old) {
        message.find('.item-price .price span').text(data.prices.old);
    } else {
        message.find('.item-price .price').remove();
    }
    message.find('.total-sum span').text(data.totalSum.toFixed(2));
    message.find('.buttons .btn').attr('href', data.pageUrl);
    message.find('.buttons .btn').text(data.buttonText);

    message.find('.left i').addClass(data.class);

    $('body').append(message);
    setTimeout(function() {
        message.addClass('d-block');
        $('.overlay').addClass('d-block');
        $('.tooltip').removeClass('show');
    }, 10);

    $('.cart-left-btn').click(function () {
        message.removeClass('d-block');
        message.closest('.add-to-cart-message').remove();
        $('.overlay').removeClass('d-block');

    })



    updateCount(countElement, data);
}

function updateCount(countElement, data) {
    if (typeof countElement != 'undefined') {
        addLoading(countElement);
        countElement.text(data.totalCount);
        countElement.toggleClass('show', data.totalCount > 0);

        setTimeout(function() {
            removeLoading(countElement);
        }, 500);
    }
}


function closeMessage(message) {
    $('.cart-left-btn').click(function () {
        message.removeClass('d-block');
        message.closest('.add-to-cart-message').remove();
        })

}



function addLoading(elem) {
    elem.addClass('loading-circle');
}

function removeLoading(elem) {
    elem.removeClass('loading-circle');
}

$('#read-more, #read-less').click(function(){
    $('.category-content p, .category-content ul, .category-content ul li p,#read-more, #read-less').toggle();
})

$('#read-more-index, #read-less-index').click(function(){
    $('.index-page-content p, .index-page-content ul, .index-page-content ul li p,#read-more-index, #read-less-index').toggle();
})

function initFilters() {
    if ($('#filter-form').length < 1) {
        return;
    }

    var filterTimo;
    var form = $('#filter-form');
    var submitTimeout = 0;
    var filters = $('.filter', form);

    if (typeof FORM_SUBMIT_TIMEOUT != 'undefined') {
        submitTimeout = FORM_SUBMIT_TIMEOUT;
    }

    initPriceFilter();
    addScrolls();

    function addScrolls() {
        if (filters.length < 1) {
            return false;
        }

        $('.content', filters).each(function() {
            var collapsed = false;
            var removeClass = true;

            if ((collapsed = $(this).parents('.collapse'))) {
                if (collapsed.hasClass('show')) {
                    removeClass = false;
                }
                collapsed.addClass('show');
            }

            $(this).height($(this).height());

            if (removeClass) {
                collapsed.removeClass('show');
            }

            if ($(this).find('.price-inputs').length > 0) {
                return;
            }

            addScrollbar($(this));
        });
    }

    $('[type="checkbox"], [type="radio"]', form).on('change', function() {
        submitForm();
    });

    function initPriceFilter() {
        if ($('.price-inputs').length < 1) {
            return false;
        }

        var minPrice = $('.price-inputs [name="price-from"]');
        var maxPrice = $('.price-inputs [name="price-to"]');
        var min = parseInt(minPrice.attr('min'));
        var max = parseInt(maxPrice.attr('max'));
        var priceTimo;
        var slider = $('.slider', form).slider({
            animate: 'fast',
            min: min,
            max: max,
            range: true,
            values: [minPrice.val(), maxPrice.val()],
            slide: function(event, ui) {
                if (ui.values[0] >= ui.values[1]) {
                    return false;
                }
                minPrice.val(ui.values[0]);
                maxPrice.val(ui.values[1]);
            },
            change: function() {
                submitForm();
            }
        });

        $('.price-inputs input').on('blur', function(e) {
            clearTimeout(priceTimo);
            priceTimo = setTimeout(function() {
                var mip = parseInt(minPrice.val());
                var map = parseInt(maxPrice.val());
                var sliderValues = slider.slider('option', 'values');

                if (mip == sliderValues[0] && map == sliderValues[1]) {
                    return;
                }

                if (isNaN(mip)) {
                    mip = 0;
                }

                if (isNaN(map)) {
                    map = mip;
                }

                if (mip <= min) {
                    minPrice.val(min);
                }
                if (map > max) {
                    maxPrice.val(max);
                }
                if ($(this).attr('id') == 'price-from') {
                    if (mip >= map) {
                        minPrice.val(map - 1);
                    }
                } else {
                    if (mip >= map) {
                        maxPrice.val(mip + 1);
                    }
                }

                if (e.originalEvent) {
                    maxPrice.trigger('change');
                    minPrice.trigger('change');
                }
                slider.slider('values', [minPrice.val(), maxPrice.val()]);
                submitForm();
            }, 10);
        });
    }

    function submitForm() {
        clearTimeout(filterTimo);
        filterTimo = setTimeout(function() {
            form.submit();
        }, submitTimeout);
    }
}

function addScrollbar(element, outside) {
    element.mCustomScrollbar('destroy');
    element.mCustomScrollbar({
        scrollbarPosition: outside ? 'outside' : 'inside',
        scrollInertia: 150
    });
}

function addSpinner(id, conf) {

    var opts = typeof conf == 'object' ? conf : spinner_opts;
    if (typeof conf == 'object') {
        for (var prop in spinner_opts) {
            opts[prop] = typeof conf[prop] != 'undefined' ? conf[prop] : spinner_opts[prop];
        }
    } else {
        opts = spinner_opts;
    }


    var target = document.getElementById(id);
    var spinner = new Spinner(opts).spin(target);
}

var spinner_opts = {
    lines: 10, // The number of lines to draw
    length: 17, // The length of each line
    width: 10, // The line thickness
    radius: 18, // The radius of the inner circle
    color: '#891F61', // #rgb or #rrggbb
    speed: 1.5, // Rounds per second
    trail: 50, // Afterglow percentage
    shadow: false // Whether to render a shadow
};
