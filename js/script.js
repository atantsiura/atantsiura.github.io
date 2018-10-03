$(document).ready(function () {

// Animated counter in section counter. Using JS library
    var target_block = $(".counter");
    var blockStatus = true;
    $(window).scroll(function () {
        var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
        if (scrollEvent && blockStatus) {
            blockStatus = false;
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 3000
            });
        }
    });

    //AJAX request information about people for TEAM section from randomuser.me

    var url = 'https://randomuser.me/api/?results=6&gender=male&nat=us&inc=name,email,phone,cell,picture&noinfo';
    request = $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    });

    request.done(function (msg) {
        display(msg);
        $('.slider-ajax').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            slide: ".ajax-slider-item",
            dots: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
        ]
        });

    });
    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    //Slider Team Members on click details modal window

    $('.slider-ajax').click(function (e) {
        var modale = $('#teamMemberInfo');
        var modaleMemberDiv = modale.find('.modal-content');
        var dest = $(e.target);

        if ((dest.hasClass('slick-dots'))||(dest.is('button'))) {
            return;
        } else {
            dest = dest.closest('.ajax-slider-item');
            modale.addClass('in');
            modale.modal('show');
            //Alternative way with object for storage of finding results
/*          var details = {};
            details.src =  dest.find('img').attr("src");
            details.name = dest.find('.name').text();
            details.specialization = dest.find('h5').text();
            details.email = dest.find('.teamMemberDetails').attr("data-email");
            details.phone = dest.find('.teamMemberDetails').attr("data-phone");
            details.cell = dest.find('.teamMemberDetails').attr("data-cell");*/

            modaleMemberDiv.find('img').attr("src", dest.find('img').attr("src"));
            modaleMemberDiv.find('h4').text(dest.find('.name').text());
            modaleMemberDiv.find('h5').text(dest.find('h5').text());
            modaleMemberDiv.find('.email').text(dest.find('.teamMemberDetails').attr("data-email"));
            modaleMemberDiv.find('.phone').text(dest.find('.teamMemberDetails').attr("data-phone"));
            modaleMemberDiv.find('.cell').text(dest.find('.teamMemberDetails').attr("data-cell"));
        }
    });

    //Isotope layout

    $('.isotope').isotope({
        // options
        layoutMode: 'masonry',
        itemSelector: '.isotope-item'
    });

    //First slider initiation

    $('.slider-first').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        slide: ".slider-item",
        dots: false
    });

    //Smooth scroll on links animation

    var $anchors = $('a[href^="#"]').not('[href^="#collapse"]').not('[href="#"]');

    $anchors.click(function (e) {
        e.preventDefault();

        var id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000);
    });

    //Google Map initiation and options

    var mapHolder = document.getElementById('map'),
        lat = 47.608,
        lon = -122.335,
        latmarker = 47.609689,
        lonmarker = -122.338956;

    displayMap(mapHolder, lat, lon);


    function displayMap(mapHolder, lat, lon) {
        var center = new google.maps.LatLng(lat, lon),
            markerplace = new google.maps.LatLng(latmarker, lonmarker),
            marker = new google.maps.Marker({
                position: markerplace,
                icon:'img/HOME.svg',
                animation: google.maps.Animation.BOUNCE
            }),
            mapProp= {
                center: center,
                zoom: 15.9,
                disableDefaultUI: true
            };

        var map = new google.maps.Map(mapHolder, mapProp);

        marker.setMap(map);
        $(mapHolder).show();
    }

    //Function for Ajax-request operating
    function display(msg) {
        var teamArray = msg.results,
            teamMemberInfo = {},
            teamLocalImg = [
                'img/team1.jpg',
                'img/team2.jpg',
                'img/team3.jpg',
                'img/team4.jpg',
                'img/team5.jpg',
                'img/team6.jpg'
            ],
            teamSpecialization = [
                'Graphic Design',
                'Branding/UX design',
                'Developer',
                'Developer',
                'WEB Design',
                'Photographer'
            ],

            slickItem = document.createElement('div');
        var templateRaw = $('#template').html();
        var template = _.template(templateRaw);

        slickItem.className = 'slider-item';
        var destination = $('.slider-ajax');

        for (var i=0; i < teamArray.length; i++) {
            teamMemberInfo.src=teamArray[i].picture.large;
            teamMemberInfo.name=teamArray[i].name.first + ' ' + teamArray[i].name.last;
            teamMemberInfo.email=teamArray[i].email;
            teamMemberInfo.cell=teamArray[i].cell;
            teamMemberInfo.phone=teamArray[i].phone;
            slickItem.innerHTML = template({'src': teamLocalImg[i], 'name': teamMemberInfo.name, 'specialization':teamSpecialization[i], 'email': teamMemberInfo.email, 'phone': teamMemberInfo.phone, 'cell': teamMemberInfo.cell});
            destination.append(slickItem.innerHTML);
        }
    }
});