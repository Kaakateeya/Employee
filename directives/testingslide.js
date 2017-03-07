app.directive("slideShowss", ['$uibModal', 'commonpage',

    function(uibModal, commonpage) {
        return {
            restrict: "E",
            scope: {
                array: '=',
                typeofsearch: '=',
                pagging: '='
            },
            templateUrl: "templates/testingslidedesign.html",
            link: function(scope, element, attrs) {
                scope.displayArr = scope.array;
                //Bootstrap Carousal
                scope.checkitemnew = function(carouselID) {
                    var $this;
                    $this = $("#" + carouselID);
                    if ($("#" + carouselID + " .carousel-inner .item:first").hasClass("active")) {
                        $("#" + carouselID).find('.left').hide();
                        $("#" + carouselID).find('.right').show();
                    } else if ($("#" + carouselID + " .carousel-inner .item:last").hasClass("active")) {
                        $("#" + carouselID).find('.left').show();
                        $("#" + carouselID).find('.right').hide();
                    } else {
                        $("#" + carouselID).find('.left').show();
                        $("#" + carouselID).find('.right').show();
                    }
                };

                function pageload(carouselID, curProfileID, totalrecordsID, lnkLastSlide, playButtonID, pauseButtonID) {
                    currentslide = 1;
                    var totalItems = $('#' + carouselID).find('.item').length;
                    if (totalItems === 0) {
                        // scope.$emit('slideshowsubmit', 1, 10, "slideshow");
                        scope.checkitemnew(carouselID);
                    }
                    slidBind(carouselID, curProfileID, totalrecordsID, lnkLastSlide, playButtonID, pauseButtonID);
                    ArrowMove(carouselID);
                    checkitemGlobal(carouselID);
                }

                function slidBind(carouselID, curProfileID, totalrecordsID, lnkLastSlide, playButtonID, pauseButtonID) {

                    $('#' + carouselID).bind('slide.bs.carousel', function(e) {

                        $('.list-inline li a').removeClass('selected');
                        $('[id=carousel-selector-' + $('#' + carouselID).find('div.active').index() + ']').addClass('selected');
                        var totalItems1 = $('#' + carouselID).find('.item').length;
                        var currentIndex1 = $('#' + carouselID).find('div.active').index() + 1;
                        $("#lnkLastSlide").text(currentIndex1);
                        $('#' + carouselID).find('div.active').index();
                        if (currentslide < currentIndex1) {
                            if (logincustid !== undefined && logincustid !== null && logincustid !== "") {
                                if (parseInt(totalItems1) - parseInt(currentIndex1) === 4) {
                                    scope.$emit('slideshowsubmit', totalItems1 + 1, totalItems1 + 10, "slideshow");
                                }
                            } else {
                                if (parseInt(totalItems1) - parseInt(currentIndex1) === 1) {
                                    scope.$emit('showloginpopup');
                                }
                            }
                        }
                        currentslide = currentIndex1;

                    });
                }
                //method to move slide to left or right arrow press
                function ArrowMove(carouselID) {
                    $(document).bind('keyup', function(e) {
                        var totalItems = $('#' + carouselID).find('.item').length;
                        var currentIndex = $('#' + carouselID).find('div.active').index() + 1;
                        if (e.which == 39) {
                            if (totalItems != currentIndex)
                                $('#' + carouselID).carousel('next');
                        } else if (e.which == 37) {
                            if (currentIndex != 1)
                                $('#' + carouselID).carousel('prev');
                        }
                    });
                }

                function checkitemGlobal(carouselID) {
                    var checkitem = function() {
                        scope.checkitemnew(carouselID);
                    };
                    $("#" + carouselID).on("slid.bs.carousel", "", checkitem);
                }
                scope.playslide = function() {

                    scope.playpausebuttons = true;
                    scope.pauseplaybuttons = false;
                    $('#slideShowCarousel').carousel({
                        interval: 2000,
                        pause: "false"
                    });
                };
                scope.pauseslide = function() {

                    scope.playpausebuttons = false;
                    scope.pauseplaybuttons = true;
                    $('#slideShowCarousel').carousel('pause');
                };

                scope.Slideshowpage = function() {
                    scope.$emit('slideshowrefinehide');
                    scope.slideshowsearches = true;
                    scope.playpausebuttons = false;
                    scope.partnersearchessearches = false;
                    scope.searchestype = true;
                    pageload("slideShowCarousel", "lblcurrentprofile", "lblcurSlide", "lnkLastSlide", "playButton", "pauseButton");
                    $('.search_result_items_main').attr("style", "width:100%;");
                    scope.checkitemnew("slideShowCarousel");
                    $('#slideShowCarousel').carousel('pause');
                };

                ///////
                scope.modalpopupclose = function() {
                    alerts.dynamicpopupclose();
                };
                scope.$on("photoalbum", function(event, custid, profileid, photocount) {

                    scope.photoalbum(custid, profileid, photocount);
                });
                scope.$on('setslide', function(event) {
                    scope.listclick();
                });
                scope.$on('viewprofileinsert', function(event, custid) {
                    scope.serviceactions('V', custid);
                });
            }
        };
    }
]);