(function($) {

    var	$window = $(window),
        $body = $('body');

    // Breakpoints (assuming breakpoints.js and browser.js are included and working).
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile)
        $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function() {
        var $this = $(this),
            $wrapper = $('<div class="textarea-wrapper"></div>'),
            $submits = $this.find('input[type="submit"]');

        $this
            .wrap($wrapper)
            .attr('rows', 1)
            .css('overflow', 'hidden')
            .css('resize', 'none')
            .on('keydown', function(event) {
                if (event.keyCode == 13 && event.ctrlKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).blur();
                }
            })
            .on('blur focus', function() {
                $this.val($.trim($this.val()));
            })
            .on('input blur focus --init', function() {
                $wrapper.css('height', $this.height());
                $this.css('height', 'auto').css('height', $this.prop('scrollHeight') + 'px');
            })
            .on('keyup', function(event) {
                if (event.keyCode == 9)
                    $this.select();
            })
            .triggerHandler('--init');

        // Fix.
        if (browser.name == 'ie' || browser.mobile)
            $this.css('max-height', '10em').css('overflow-y', 'auto');
    });

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {
        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;
    };

    $menu._show = function() {
        if ($menu._lock())
            $body.addClass('is-menu-visible');
    };

    $menu._hide = function() {
        if ($menu._lock())
            $body.removeClass('is-menu-visible');
    };

    $menu._toggle = function() {
        if ($menu._lock())
            $body.toggleClass('is-menu-visible');
    };

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {
            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function() {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        })
        .on('click', function(event) {
            $menu._hide();
        })
        .on('keydown', function(event) {
            if (event.keyCode == 27)
                $menu._hide();
        });

    // Global Back to Top button
    document.addEventListener("DOMContentLoaded", function() {
        // Back to Top button
        const backToTopButtons = document.querySelectorAll(".backToTopBtn");
        backToTopButtons.forEach(button => {
            // Show the button when scrolling down 20px
            window.onscroll = function() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    button.style.display = "block";
                } else {
                    button.style.display = "none";
                }
            };

            // Scroll to the top when the button is clicked
            button.onclick = function() {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
            };
        });

        // Single Back to Top button (if you have an element with id="myBtn")
        var backToTopButton = document.getElementById("myBtn");
        if (backToTopButton) {
            // Show the button when scrolling down 20px
            window.onscroll = function() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    backToTopButton.style.display = "block";
                } else {
                    backToTopButton.style.display = "none";
                }
            };

            // Scroll to the top when the button is clicked
            backToTopButton.onclick = function() {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For others
            };
        }
    });

})(jQuery);
