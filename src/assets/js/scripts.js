document.addEventListener("DOMContentLoaded", function () {
    /*!
        * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
        * Copyright 2013-2020 Start Bootstrap
        * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
        */
    (function ($) {
        "use strict";

        // Add active state to sidbar nav links
        var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });


    })(jQuery);

    // Checkbox All Selection
    $(".check-all").click(function () {
        $(".check-item").prop('checked', $(this).prop('checked'));
    });

    // Right Click Disable
    window.oncontextmenu = function () {
        return false;
    }
    $(document).keydown(function (event) {
        if (event.keyCode == 123) {
            return false;
        }
        else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
            return false;
        }
    });


});
