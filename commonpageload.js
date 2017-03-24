app.factory('commonpagecc', ['$uibModal', 'photoalubum', function(uibModal, photoalubum) {
    var modalinstance, modalpopupopen, modalpopupopenphoto;
    var obj = {};
    var $table = $('#GridTable');
    obj.gotoSlide = function(e) {
        var lastslide = parseInt($("#lnkLastSlide").text());
        if (parseInt($(e).val()) <= lastslide) {
            $('#myCarousel').carousel(parseInt($(e).val()) - 1);
            $(e).val('');
            return false;
        } else {
            alert('you can go till ' + lastslide + ' slide only');
        }
    };
    return {
        showPopup: function(url, scope, size, classp) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                size: size,
                backdrop: 'static',
                windowClass: classp
                    // keyboard: false
            });
        },
        showPopupphotopoup: function(url, scope, size, classp) {
            modalpopupopenphoto = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                size: size,
                backdrop: 'static',
                windowClass: classp
                    // keyboard: false
            });
        },
        closepopup: function() {
            modalpopupopen.close();
        },
        closepopuppoptopopup: function() {
            modalpopupopenphoto.close();
        },
        pausePalyslide: function(type, id) {
            debugger;
            if (type === 'play') {
                $('#' + id).carousel({
                    interval: 2000,
                    pause: "false"
                });
            } else {
                $('#' + id).carousel('pause');
            }

        },
        checkitem: function(carouselID) {

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
            return false;
        },

        ArrowMoveSlide: function(carouselID) {
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
            return false;
        },

        moveonenter: function() {
            // $(function() {
            //     var wage = document.getElementById("txtGotoVal");
            //     wage.addEventListener("keydown", function(e) {
            //         if (e.keyCode === 13) {
            //             obj.gotoSlide(wage);
            //             $('#myCarousel').carousel(parseInt($(wage).val()) - 1);
            //             $('#myCarousel').carousel('pause');
            //             $('#playButton').show();
            //             $('#pauseButton').hide();
            //             return false;
            //         }

            //     });
            // });
        },
        ShowPhotoPopup: function(custid, scope) {
            photoalubum.getphotoslideimages(custid).then(function(response) {
                slides = [];
                _.each(response.data, function(item) {
                    slides.push(item);
                });
            });
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/dynamicPhotoPopup.html',
                scope: scope,
                backdrop: 'static',
                keyboard: false
            });
        },
        setColumns: function(test) {
            var arrayyy = [];
            _.each(test, function(item, index) {
                if (item.substring(0, 1) != "_") {
                    var obj = {};
                    obj.field = item;
                    obj.title = item;
                    obj.sortable = true;
                    obj.searchable = true;
                    obj.visible = true;
                    obj.switchable = true;

                    arrayyy.push(obj);
                }
            });

            return arrayyy;
        },
        bindfunction: function(carousalID) {

            $('#' + carousalID).bind('slide.bs.carousel', function() {
                var currentslide = 1;
                var totalItems1 = $('#' + carousalID).find('.item').length;
                var currentIndex1 = $('#' + carousalID).find('div.active').index() + 1;
                if (currentslide < currentIndex1) {
                    if (parseInt(totalItems1) - parseInt(currentIndex1) === 4) {
                        scope.$emit('slideshowsubmit', totalItems1 + 1, totalItems1 + 10);
                    }

                }
            });

        }

    };
}]);