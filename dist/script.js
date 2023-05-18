//* Functions
function toggleClassActive(item) {
    item = document.querySelector(`.${item}`);
    item.classList.toggle('active');
};
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
function footerList() {
    if (document.documentElement.clientWidth > 1024) {
        document.querySelector('.menu__list').classList.add('active');
    }

    if (document.documentElement.clientWidth <= 1024) {
        window.addEventListener('click', function (e) {
            if (e.target.classList.contains('footer__dropdown-title') === true) {
                const footerDropdownMenu = e.target.closest('.footer__dropdown-menu');
                const footerDropdownUl = footerDropdownMenu.querySelector('ul');
                const dropdownUlHeight = footerDropdownUl.offsetHeight;
                const footerDropdownMenuPaddingBttm = parseInt(window.getComputedStyle(footerDropdownMenu).paddingBottom);
                const footerDropdownTitle = footerDropdownMenu.querySelector('.footer__dropdown-title');
                const footerDropdownTitleHeight = footerDropdownTitle.offsetHeight;
                const footerDropdownMenuHeight = dropdownUlHeight + footerDropdownTitleHeight + footerDropdownMenuPaddingBttm;
                footerDropdownUl.classList.toggle('active');
                footerDropdownMenu.classList.toggle('active');

                if (footerDropdownMenu.classList.contains('active') == true) {
                    footerDropdownMenu.style.height = footerDropdownMenuHeight + 'px';
                } else {
                    footerDropdownMenu.style.height = footerDropdownTitleHeight + 'px';
                }

            }
        });
    }
};
function resizeDebounce() {
    window.addEventListener('resize', footerList);
};


Ellipsis({
    ellipsis: '…',
    debounce: 300,
    responsive: true,
    className: '.clamp',
    lines: 3,
    portrait: null,
    break_word: false
});
debounce(resizeDebounce, 300);
footerList();

$('.finder').on("input", function () {
    if ($('.finder input').val() == "") {
        $('.finder__cross-icon').removeClass('active')
    } else {
        $('.finder__cross-icon').addClass('active')
    }
    $('.finder__cross-icon').click(function () {
        $('.finder input').val("");
        $(this).removeClass('active');
        $('.finder input').focus();
    });
});

$(".finder input").mouseenter(function () {
    $('.finder__cross-icon').addClass('gray-bg');
});

$(".finder input").mouseout(function () {
    $('.finder__cross-icon').removeClass('gray-bg');
});

$(".finder input").focus(function () {
    $('.finder__cross-icon').addClass('gray-bg');

    $(".finder input").mouseout(function (e) {
        $('.finder__cross-icon').addClass('gray-bg');
    });
});

$(".finder input").focusout(function () {
    $('.finder__cross-icon').removeClass('gray-bg');

    $(".finder input").mouseout(function (e) {
        $('.finder__cross-icon').removeClass('gray-bg');
    });
});

const headerOptions = document.querySelector('.header__options');

headerOptions.addEventListener('click', () => {
    if (document.documentElement.clientWidth <= 1024) {
        toggleClassActive('header');
        toggleClassActive('header__options');
        toggleClassActive('menu');
        toggleClassActive('backdrop-black');
    } else {
        toggleClassActive('header__options');
        toggleClassActive('menu');
        toggleClassActive('backdrop-black');
    }

});

$('.menu__element').append('<div class="more-or-less"><p>Еще</p><p style="display: none">Скрыть</p><svg class=""><use xlink:href="#back"></use></svg></div>');

$('.menu__element').each(function () {
    if ($(this).children('li').length == 6) {
        $(this).children('.more-or-less').remove();
    }
});

$(".more-or-less").click(function () {
    $(this).toggleClass('active');
    $(this).children('p').toggle();
    $(this).parent().toggleClass('active');

});

$(".menu__content h1 a").html($('.menu__headlines div.active p').clone());

$(".backdrop-black").click(function () {
    $(".header__options, .menu, .backdrop-black").removeClass('active');
});

$('.menu__headlines >div').append('<svg class=""><use xlink:href="#next"></use></svg>');

$('.footer__dropdown-title').append('<svg class=""><use xlink:href="#back"></use></svg>');

$(function () {
    // Products Слайдер
    $('.product__pics').slick({
        infinite: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        dragable: false,
        adaptiveHeight: true,
        waitForAnimate: true,
        pauseOnHover: true,
        responsive: [{
            breakpoint: 1201,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $(".product__right-button").click(function () {
        $('.product__pics').slick('slickNext');
    });

    $(".product__left-button").click(function () {
        $('.product__pics').slick('slickPrev');
    });

    // allRowCards Слайдер
    $(".row-cards__pics div").addClass("row-cards__item");

    $(".row-cards__pics").slick({
        infinite: false,
        dots: false,
        slidesToShow: 8.5,
        slidesToScroll: 9.5,
        arrows: false,
        autoplay: false,
        speed: 1000,
        pauseOnHover: true,
        waitForAnimate: true,

    });


    $(".row-cards__button").click(function () {
        $(this).css({
            'display': 'none'
        });
    });

    $(".row-cards__left-button").click(function () {
        $('.row-cards__pics').slick('slickPrev');
        $(".row-cards__right-button").css({
            'display': 'flex'
        });
    });

    $(".row-cards__right-button").click(function () {
        $(".row-cards__pics").slick('slickNext');
        $(".row-cards__left-button").css({
            'display': 'flex'
        });
    });

});

$('.support-button').click(function () {
    $('.support').toggleClass('active');
    $('.support__input').focus();
});

$('.support__headline p').click(function () {
    $('.support').toggleClass('active');
});

$('.support__input-container').on("input", function () {
    if ($('.support__input').val() == "") {
        $('.support__send').removeClass('active')
        $('.support__send-icon').removeClass('active')
    } else {
        $('.support__send').addClass('active')
        $('.support__send-icon').addClass('active')
    }
});

let toggleBtn, counter, counterWrapper, addRemove, tgglBtn, toCart, headlinesParent, headlineChildren, menuContent, menuList;

window.addEventListener('click', function (e) {


    if (e.target.classList.contains('add-to-cart__to-cart')) {
        e.target.classList.toggle('active');
        toggleBtn = e.target.closest('.add-to-cart');
        addRemove = toggleBtn.querySelector('.add-to-cart__plus-minus');
        addRemove.classList.toggle('active');
    }


    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        counterWrapper = e.target.closest('.plus-minus');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    if (e.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    if (e.target.dataset.action === 'minus') {
        if (+counter.innerText > 1) {
            counter.innerText = --counter.innerText;
        }

        else if (+counter.innerText == 1 && e.target.closest('.plus-minus').classList.contains('add-to-cart__plus-minus') == true) {
            counterWrapper.classList.toggle('active');
            tgglBtn = e.target.closest('.add-to-cart');
            toCart = tgglBtn.querySelector('.add-to-cart__to-cart');
            toCart.classList.toggle('active')
        }
    }

    if (e.target.hasAttribute('data-headline') === true) {
        headlinesParent = e.target.closest('.menu__headlines');
        headlineChildren = headlinesParent.querySelectorAll('div');
        headlineChild = headlinesParent.querySelector('.active');
        menuContent = document.querySelector('.menu__content');
        menuList = menuContent.querySelectorAll('.menu__list');

        menuList.forEach(function (e, i) {
            e.setAttribute('data-menuList', i + 1);
        });

        headlineChildren.forEach(function (e, i) {
            e.classList.remove('active');
            e.setAttribute('data-headline', i + 1)
        });

        e.target.classList.add('active');

        dataHeadline = e.target.getAttribute('data-headline');
        menuContainer = e.target.closest('.menu__container');
        menuContent = menuContainer.querySelector('.menu__content');
        menuList = menuContent.querySelectorAll('.menu__list');

        menuList.forEach(function (e) {
            e.classList.remove('active')
            if (e.getAttribute('data-menuList') == dataHeadline) {
                e.classList.add('active');
            }
        });

    }
});





$(".basket-content >div").after("<span class='horizontal-line'></span>");

$('.basket-content__main-checkbox').change(function () {
    if ($(this).is(':checked')) {
        $(".basket-content__elements input[type=checkbox]").prop('checked', true);
    } else {
        $(".basket-content__elements input[type=checkbox]").prop('checked', false);
    }
});