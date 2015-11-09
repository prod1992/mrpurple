
//pull header down when scroll up //core
var lastScrollTop = 0,
    st,
    direction;

function getHeaderWhenUp() {
    $('header').removeClass('pulled-up');
}

function detectDirection(a) {

    st = window.pageYOffset;

    if (st > lastScrollTop) {
        direction = "down";
    } else {
        direction = "up";
        a();
    }

    lastScrollTop = st;

    return direction;

}








$(window).scroll(function() {
    //just a test with scrolltop

    var wScroll = $(window).scrollTop();
    //menu background parallax effect

    $('.menus .this-bg img').each(function() {

        var $bgobj = $(this); // создаем объект
        var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
        $bgobj.css("transform", "translateY(" + yPos + "px)");
    });





    //header pull up when scrolled down
    (function() {
        if (wScroll > 150) {
            $('header').addClass('pulled-up');
        } else {
            $('header').removeClass('pulled-up');
        }
    })();

    //pull down when scroll direction is up
    detectDirection(getHeaderWhenUp);

    //fade in boxes in menu
    (function() {
        $('.page-content .menus .box-center').each(function() {
            if (wScroll > $(this).offset().top - 700) {
                $(this).addClass('faded-in');
            } else {
                $(this).removeClass('faded-in');
            }

        });



    })();












});





$(document).ready(function() {
    $('.home-slider').slick({
        arrows: true,
        dots: false
    });



    $("a.book-btn, li.book-table-mob a").click(function(e) {
        e.stopPropagation();
        e.preventDefault();

        if ($(this).parent('li').hasClass('book-table-mob')) {
            $('.page-content').removeClass('nav-open');
            $('nav').animate({
                'right': -320
            }, 200);
            $('header .menu-toggle').removeClass('rotated');
            $('header .menu-toggle').children('.first, .third').removeClass('transform');
            $('header .menu-toggle').children('.first').removeClass('rotate2');
        }





        if ($('.book-a-table').children('.this-bg').hasClass('on')) {
            $(".book-a-table").children('.this-bg').removeClass('on');
            setTimeout(function() {
                $('.book-a-table').slideToggle();
                $('.page-title').html('');
            }, 300);

        } else {

            $(".book-a-table").slideToggle(function() {
                $(".book-a-table").children('.this-bg').addClass('on');
                $('.page-title').html('BOOK A TABLE');
            });
        }




    });


    $('.gallery-slider').slick({
        arrows: true,
        focusOnSelect: false,
        speed: 700,
        appendArrows: $('.controls'),
        variableWidth: true,
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1


    });


    $('header .menu-toggle').on('click', function(e) {
        e.preventDefault();
        var _this = $(this);
        if

        (_this.hasClass('rotated')) {

            $('.page-content').removeClass('nav-open');
            $('nav').animate({
                'right': -320
            }, 900);
            _this.removeClass('rotated');
            _this.children('.first, .third').removeClass('transform');
            _this.children('.first').removeClass('rotate2');
        } else {
            $(this).children('.first, .third').addClass('transform');
            $('.page-content').addClass('nav-open');
            $('nav').animate({
                'right': 0
            }, 400);



            setTimeout(function() {
                _this.addClass('rotated');
            }, 400);

            setTimeout(function() {
                _this.children('.first').addClass('rotate2');
            }, 400);
        }



    });





});


$(document).scroll(function(e) {
    var container = $("nav");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0 && $('header .menu-toggle').hasClass('rotated')) // ... nor a descendant of the container
    {
        $('.page-content').removeClass('nav-open');
        $('nav').animate({
            'right': -320
        }, 900);
        $('header .menu-toggle').removeClass('rotated');
        $('header .menu-toggle').children('.first, .third').removeClass('transform');
        $('header .menu-toggle').children('.first').removeClass('rotate2');
    }
});



$(document).on('mouseup', function(e) {
    var container = $("nav");
    var container2 = $('header');
    var bookBox = $('.book-a-table');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0 && $('header .menu-toggle').hasClass('rotated') && !container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('.page-content').removeClass('nav-open');
        $('nav').animate({
            'right': -320
        }, 300);
        $('header .menu-toggle').removeClass('rotated');
        $('header .menu-toggle').children('.first, .third').removeClass('transform');
        $('header .menu-toggle').children('.first').removeClass('rotate2');
    }

    if (!bookBox.is(e.target) && bookBox.has(e.target).length === 0 && $('.book-a-table').is(':visible') && $(window).width() < 769) {
        $('.book-a-table').slideToggle();
        $('.page-title').html('');
    }
});





$(document).ready(function() {
    // $('.couples:not(:first)').each(function() {
    //     $(this).find('.col-md-6:eq(0)').insertAfter('.col-md-6:eq(1)');
    // });







    $('header .logo').click(function() {
        $('.loader').addClass('active');
        $('nav ul li a').removeClass('active');
         window.history.replaceState('Object', 'Title', '/');
        $('.page-content').fadeOut(1000, function() {

            $('.page-content').html('');
            $('.page-title').html('');

                $.ajax({
                    url: '/',
                    dataType: 'html',

                    success: function(data) {
                        var response = $(data).filter('.page-content').html();
                        
                        $('.page-content').html('');
                        $('.page-content').html(response);
                        $('.home-slider').slick({
                            arrows: true,
                            dots: false
                        });
                    }   
                });

            


           
            $('.page-content').trigger('resize');

            setTimeout(function() {
                $('.loader').removeClass('active');
            }, 1000);
            $(this).fadeIn(1000);

        });
        
    });





    $('nav ul li a').on('click', function(e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('book-table-mob')) {

            $('.loader').addClass('active');
            $('nav ul li a').removeClass('active');
            $(this).addClass('active');



            $('.page-content').removeClass('nav-open');
            $('nav').animate({
                'right': -320
            }, 1000);
            $('header .menu-toggle').removeClass('rotated');
            $('header .menu-toggle').children('.first, .third').removeClass('transform');
            $('header .menu-toggle').children('.first').removeClass('rotate2');







            var neededHtml;
            var thisText = $(this).text();
            window.history.replaceState('Object', 'Title', '/'+thisText);
            $('.page-content').fadeOut(1000, function() {

                setTimeout(function() {
                    $('.loader').removeClass('active');
                }, 1000);


                $.ajax({
                    url: '/' + thisText + '/',
                    dataType: 'html',
                    success: function(data) {
                        var response = $(data).filter('.page-content').html();
                        
                        $('.page-content').html('');
                        $('.page-content').html(response);
                        $('.page-title').html(thisText);

                    }  
                });
                setTimeout(function() {
                    $('.page-content').fadeIn(1000);
                }, 400);
                

               
               


                






            });           
        }
    });
});
