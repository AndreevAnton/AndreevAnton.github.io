mobilePoint = 767;
$(document).ready(function() {
    reviewsSelect();
    primNavInit();
    formLightBoxInit();
    scrollUp();
    loadMoreReviews();
    loadMoreTeams();
    minimizeReviews();
    headerScroll()
});
$(window).load(function() {
    initForWhomSlider();
    initQuestionsSlider();
    initWhySlider();
    initReviewsSlider();
    initTeamSlider();
    mobileMenu()
});
$(window).scroll(function() {
    scrollNav();
    headerScroll()
});

function initForWhomSlider() {
    var $el = $('.for-whom ul'),
        windowWidth = $(window).width(),
        options = {
            controls: false,
            slideWidth: 292
        };
    if (windowWidth <= mobilePoint && $el.length > 0) {
        $el = $el.bxSlider(options)
    }
    $(window).resize(function() {
        if ($el.length > 0) {
            if ($(window).width() <= mobilePoint) {
                if (!$el.parent().hasClass('bx-viewport')) {
                    $el = $el.bxSlider(options)
                }
            } else {
                if ($el.parent().hasClass('bx-viewport')) {
                    $el.destroySlider()
                }
                $('.for-whom ul li').attr('style', '')
            }
        }
    })
}

function initQuestionsSlider() {
    var $el = $('.questions ul'),
        windowWidth = $(window).width(),
        options = {
            controls: false,
            adaptiveHeight: false
        };
    if (windowWidth <= mobilePoint && $el.length > 0) {
        $el = $el.bxSlider(options)
    }
    $(window).resize(function() {
        if ($el.length > 0) {
            if ($(window).width() <= mobilePoint) {
                if (!$el.parent().hasClass('bx-viewport')) {
                    $el = $el.bxSlider(options)
                }
            } else {
                if ($el.parent().hasClass('bx-viewport')) {
                    $el.destroySlider()
                }
                $('.questions ul li').attr('style', '')
            }
        }
    })
}

function initWhySlider() {
    var $el = $('.why__slider');
    $el.bxSlider({
        controls: false,
        pagerCustom: '.why__slider-preview'
    })
}

function initReviewsSlider() {
    $('.reviews__slider').bxSlider({
        controls: false
    })
}

function reviewsSelect() {
    var isMobile = false,
        windowWidth = $(window).width();
    if (windowWidth <= mobilePoint) {
        isMobile = true
    }
    $(window).resize(function() {
        if ($(window).width() <= mobilePoint) {
            isMobile = true
        } else isMobile = false
    });
    var $el = $('.js-reviews-select'),
        $elements = $('.reviews__list-item'),
        $elMessage = $('.reviews__list-item__message'),
        totalPadding = 0,
        indexElement = 0;
    showReviewMessage($el.eq(0));
    $elements.each(function(index) {
        indexElement = $elements.length > 3 ? index % 4 : element.parent(
            '.reviews__list-item').index();
        $(this).addClass("reviews__list-item_col" + indexElement)
    });
    $el.on('click', function(e) {
        e.preventDefault();
        showReviewMessage($(this))
    })
}

function showReviewMessage(element) {
    var isMobile = false,
        windowWidth = $(window).width();
    if (windowWidth <= mobilePoint) {
        isMobile = true
    }
    var $elements = $('.reviews__list-item'),
        $elMessage = element.next('.reviews__list-item__message');
    var $elParent = element.parent('.reviews__list-item'),
        paddingBottom = isMobile ? 27 : 67,
        elementBorderHeight = isMobile ? 23 : 55;
    var totalPadding = $elMessage.height() + elementBorderHeight +
        paddingBottom;
    $('.reviews__list-item_active').removeClass('reviews__list-item_active');
    $elements.css({
        'paddingBottom': 0
    });
    element.parent('.reviews__list-item').css({
        'paddingBottom': totalPadding
    }).addClass('reviews__list-item_active')
}

function initTeamSlider() {
    var $el = $('.team ul'),
        windowWidth = $(window).width(),
        options = {
            controls: false,
            slideWidth: 292
        };
    if (windowWidth <= mobilePoint && $el.length > 0) {
        $el = $el.bxSlider(options)
    }
    $(window).resize(function() {
        if ($el.length > 0) {
            if ($(window).width() <= mobilePoint) {
                if (!$el.parent().hasClass('bx-viewport')) {
                    $el = $el.bxSlider(options)
                }
            } else {
                if ($el.parent().hasClass('bx-viewport')) {
                    $el.destroySlider()
                }
                $('.team ul li').attr('style', '')
            }
        }
    })
}

function mobileMenu() {
    var $mobileMenu = $('.prim-nav'),
        $el = $('.js-mobile-menu');
    $el.on('click', function(e) {
        e.preventDefault();
        if ($mobileMenu.is(':visible')) {
            $mobileMenu.slideUp()
        } else {
            $mobileMenu.slideDown()
        }
    });
    $(document).on('click', function(e) {
        if (!$(e.target).is($el) && !$(e.target).is($el.children(
            'span')) && $(window).width() <= mobilePoint) {
            $mobileMenu.slideUp()
        }
    })
}

function inViewPortCheck($el, offset) {
    var win = $(window),
        viewportTop = win.height() + win.scrollTop();
    var elOffsetTop = $el.offset().top + offset - $(".prim-nav-wrap").height();
    return (viewportTop >= elOffsetTop)
}

function primNavInit() {
    var $links = $(".js-prim-nav a"),
        activeClass = "active";
    if ($links.length > 0) {
        $links.on("click", function(e) {
            e.preventDefault();
            var $this = $(this),
                id = $this.attr("href"),
                blockHeight = $(".prim-nav-wrap").height();
            scrollToBlock($(id), 400, blockHeight)
        })
    }
}

function scrollToBlock($toScrollBlock, speed, offset) {
    $("html, body").animate({
        scrollTop: $toScrollBlock.offset().top - offset
    }, speed)
}

function scrollNav() {
    var $links = $(".js-prim-nav a");
    $links.each(function() {
        var $this = $(this),
            id = $this.attr("href"),
            activeClass = "active";
        if (inViewPortCheck($(id), $(window).height())) {
            $links.parent("li").removeClass(activeClass);
            $this.parent("li").addClass(activeClass)
        } else {
            $this.parent("li").removeClass(activeClass)
        }
    })
}

function headerScroll() {
    var $header = $(".prim-nav-wrap"),
        $scrollUp = $('.scroll-up'),
        $layout = $('.layout');
    if ($header.length > 0) {
        var windowTop = $(window).scrollTop(),
            headerTop = $header.offset().top,
            fixedClass = "prim-nav-fixed",
            layoutFixedClass = 'layout_fixed';
        if (windowTop == 0) {
            $header.removeClass(fixedClass);
            $layout.removeClass(layoutFixedClass);
            $scrollUp.addClass('scroll-up_hide')
        } else if (windowTop >= headerTop) {
            $header.addClass(fixedClass);
            $scrollUp.removeClass('scroll-up_hide');
            $layout.addClass(layoutFixedClass)
        }
    }
}

function formLightBoxInit() {
    var $button = $(".js-lb-form-button, .js-lb-questions-button");
    if ($button.length > 0) {
        var $lbForm = $($button.attr("href")),
            $formBody = $lbForm.find(".js-form-body");
        $button.fancybox({
            padding: 0
        })
    }
}

function scrollUp() {
    var $el = $('.js-scroll-up');
    $el.on('click', function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 400)
    })
}

function loadMoreReviews() {
    var $el = $('.js-load-more-reviews'),
        $elActive = $('.js-load-minimize-reviews');
    $el.on('click', function(e) {
        e.preventDefault();
        $elActive.removeClass('hide');
        var $hidden = $('.reviews__list-item:not(:visible)');
        if ($(window).width() <= mobilePoint) {
            $hidden.slice(0, 2).removeClass(
                'reviews__list-item_hide').removeClass(
                'reviews__list-item_mobile-hide')
        } else {
            $hidden.slice(0, 4).removeClass(
                'reviews__list-item_hide').removeClass(
                'reviews__list-item_mobile-hide')
        } if ($('.reviews__list-item:not(:visible)').length == 0) {
            $(this).addClass('hide')
        }
    })
}

function minimizeReviews() {
    var $el = $('.js-load-minimize-reviews'),
        $elLoadMore = $('.js-load-more-reviews'),
        speed = 400;
    $el.on('click', function(e) {
        e.preventDefault();
        var $reviews = $('.reviews__list-item');
        if ($(window).width() <= mobilePoint) {
            $reviews.slice(2).addClass('reviews__list-item_hide').removeClass(
                '.reviews__list-item_mobile-hide');
            scrollToBlock($('.reviews__list'), speed, 60)
        } else {
            $reviews.slice(4).addClass('reviews__list-item_hide');
            scrollToBlock($('.reviews__list'), speed, 120)
        }
        $el.addClass('hide');
        $elLoadMore.removeClass('hide');
        showReviewMessage($reviews.eq(0).find(
            ".reviews__list-item__link"))
    })
}

function loadMoreTeams() {
    var $el = $('.js-load-more-teams'),
        $hiddenTeams = $('.team__item_hide');
    $el.on('click', function(e) {
        e.preventDefault();
        if ($hiddenTeams.length > 0) {
            $hiddenTeams.removeClass('team__item_hide');
            $el.addClass('hide')
        }
    })
}
$(function() {
    /*$("#phone").mask("+7 (000) 000-00-00");*/
    $(".form__order").submit(function(event) {
        if ($('#name').val() == "") {
            $('#name_form').addClass("form__row_error");
            $('#name_form').removeClass("form__row_valid");
            if ($('#phone').val() !== "") {
                $('#phone_form').removeClass("form__row_error");
                $('#phone_form').addClass("form__row_valid")
            }
        } else if ($('#phone').val() == "") {
            $('#phone_form').addClass("form__row_error");
            $('#phone_form').removeClass("form__row_valid");
            if ($('#name').val() != "") {
                $('#name_form').removeClass("form__row_error");
                $('#name_form').addClass("form__row_valid")
            }
        } else {
            if ($('#name').val() != "") {
                $('#name_form').removeClass("form__row_error");
                $('#name_form').addClass("form__row_valid")
            }
            if ($('#phone').val() !== "") {
                $('#phone_form').removeClass("form__row_error");
                $('#phone_form').addClass("form__row_valid")
            }
            var postForm = {
				'name': $('#feedback-bottom #name').val(),
                'phone': $('#feedback-bottom #phone').val(),
                'email': $('#feedback-bottom #email').val(),
                'message': $('#feedback-bottom #message').val()
            };
			
			$.ajax({
				type: "POST",
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				data: {
				  'key': 'qNS23uABRN96Mh2L56FYwA',
				  'message': {
				   'from_email': 'manager@armyconsult.ru',
				   'to': [{'email': 'manager@armyconsult.ru', 'type': 'to'}],
				   'autotext': 'true',
				   'subject': 'Yeah!',
				   'html': postForm.name + '<br>' + postForm.phone + '<br>' + postForm.email  + '<br>' + postForm.message
					}
				}
			  }).done(function(response) {
				  console.log(response);
				  if(response.status == 'sent') {
					  $('.final_hide').css('display', 'block')
					  $('.form__order-first').replaceWith($('.form__order-final.final_hide'));
				  } else {
					  $('.final_error').css('display', 'block')
					$('.form__order-first').replaceWith($('.form__order-final.final_error'));
				  }
			  });
			  //form__order-final
			/*
            $.ajax({
                type: 'POST',
                url: 'feedback.php',
                data: postForm,
                dataType: 'json',
                success: function(data) {
                    if (!data.success) {
                        if (data.errors.name) {
                            $('.form__order-first')
                                .fadeIn(1000).html(
                                    data.errors.name
                                )
                        }
                    } else {
                        $('.form__order-first').css(
                            'display', 'none');
                        $('.form__order-final').css(
                            'display', 'block')
                    }
                }
            })*/
        }
        event.preventDefault()
    })
});
$(function() {
    /*$("#phone_hide").mask("+7 (000) 000-00-00");*/
    $(".form__order_hide").submit(function(event) {
        if ($('#name_hide').val() == "") {
            $('#name_form_hide').addClass("form__row_error");
            $('#name_form_hide').removeClass("form__row_valid");
            if ($('#phone_hide').val() !== "") {
                $('#phone_form_hide').removeClass(
                    "form__row_error");
                $('#phone_form_hide').addClass(
                    "form__row_valid")
            }
        } else if ($('#phone_hide').val() == "") {
            $('#phone_form_hide').addClass("form__row_error");
            $('#phone_form_hide').removeClass("form__row_valid");
            if ($('#name_hide').val() != "") {
                $('#name_form_hide').removeClass(
                    "form__row_error");
                $('#name_form_hide').addClass("form__row_valid")
            }
        } else {
            if ($('#name_hide').val() != "") {
                $('#name_form_hide').removeClass(
                    "form__row_error");
                $('#name_form_hide').addClass("form__row_valid")
            }
            if ($('#phone_hide').val() !== "") {
                $('#phone_form_hide').removeClass(
                    "form__row_error");
                $('#phone_form_hide').addClass(
                    "form__row_valid")
            }
            var postForm = {
                'name': $('#feedback-form #name_hide').val(),
                'phone': $('#feedback-form #phone_hide').val(),
                'email': $('#feedback-form #email_hide').val(),
                'message': $('#feedback-form #message_hide').val()
            };
            /*$.ajax({
                type: 'POST',
                url: 'feedback.php',
                data: postForm,
                dataType: 'json',
                success: function(data) {
                    if (!data.success) {
                        if (data.errors.name) {
                            $(
                                '.form__order-first_hide'
                            ).fadeIn(1000).html(
                                data.errors.name
                            )
                        }
                    } else {
                        $('.first_hide').css(
                            'display', 'none');
                        $('.final_hide').css(
                            'display', 'block')
                    }
                },
                error: function(jqXHR, exception) {
                    $('.first_hide').css('display',
                        'none');
                    $('.final_error').css('display',
                        'block')
                }
            })*/
			
			$.ajax({
				type: "POST",
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				data: {
				  'key': 'qNS23uABRN96Mh2L56FYwA',
				  'message': {
				   'from_email': 'manager@armyconsult.ru',
				   'to': [{'email': 'manager@armyconsult.ru', 'type': 'to'}],
				   'autotext': 'true',
				   'subject': 'Yeah!',
				   'html': postForm.name + '<br>' + postForm.phone + '<br>' + postForm.email  + '<br>' + postForm.message
					}
				}
			  }).done(function(response) {
				  console.log(response);
				if(response.status == 'sent') {
					  $('.first_hide').css('display', 'none');
                      $('.final_hide').css('display', 'block')
				  } else {
					$('.first_hide').css('display', 'none');
                    $('.final_error').css('display', 'block')
				  }
			  });
			
        }
        event.preventDefault()
    });
    $(".button_hide").click(function(event) {
        $.fancybox.close();
        $('.final_hide').css('display', 'none');
        $('.first_hide').css('display', 'block')
    })
});

$(function() {
    /*$("#phone_hide").mask("+7 (000) 000-00-00");*/
    $(".form__order_check").submit(function(event) {
        if ($('#email_hide').val() == "") {
            $('#email_hide').css("background", "red");
            /*$('#email_form_hide').addClass("form__row_error");
            $('#email_form_hide').removeClass("form__row_valid");*/
        }
        else {
            /*window.location.pathname = "/msk/12steps.php?email="+$('#email_hide').val()*/;
        }
    event.preventDefault();
    });
});


/* jQuery Cookies */


jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

