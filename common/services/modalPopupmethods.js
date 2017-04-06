app.factory('modelpopupopenmethod', ['$uibModal', 'SelectBindServiceApp', function(uibModal, SelectBindServiceApp) {
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
    // operateFormatter = function(value, row, index) {
    //     var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>" + row.ProfileID + row.Confidential + "</a>";
    //     return paid;
    // };

    // paymentProfileID = function(value, row, index) {
    //     var status = row.Membership === 'Registration' ? 0 : 1;
    //     var paid = "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.paymentProfileID + "/" + status + "/" + row.paymentid + "'>" + row.paymentProfileID + "</a>";
    //     return paid;
    // };

    // ViewProfile = function(value, row, index) {
    //     var paid = "<a style='cursor:pointer;'   href='/Viewfullprofile/" + row.viewprofileProfileid + "'>" + row.viewprofileProfileid + "</a>";
    //     return paid;
    // };
    ProfileOwnerImg = function(value, row, index) {
        var img = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'src/images/settleimage_new.png' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'src/images/deleteimage.png' : (row.ProfileStatusID === 55 ? 'src/images/imgInActive.png' : ''));
        var paid = "<span style='color:red;'>" + row.ProfileOwner + "</span><img style='cursor:pointer;' src=" + img + "></img>";
        return paid;
    };

    setcolumnsCommon = function(test) {
        var arrayyy = [];
        _.each(test, function(item, index) {
            if (item.substring(0, 1) != "_") {
                var obj = {};
                obj.field = item;
                obj.title = item;

                if (item == 'ProfileID') {
                    obj.formatter = operateFormatter;
                } else if (item == 'paymentProfileID') {
                    obj.formatter = paymentProfileID;
                    obj.field = "ProfileID";
                    obj.title = "ProfileID";
                } else if (item == 'View Contact') {
                    obj.formatter = ViewContact;
                } else if (item == 'SA') {
                    obj.formatter = viewSa;
                } else if (item == 'Horo') {
                    obj.formatter = ViewHoro;
                } else if (item == 'Tickets') {
                    obj.formatter = ViewTicket;
                } else if (item == 'viewprofileProfileid') {
                    obj.formatter = ViewProfile;
                    obj.field = "ProfileID";
                    obj.title = "ProfileID";
                } else if (item == 'ProfileOwner') {
                    obj.formatter = ProfileOwnerImg;
                }
                obj.sortable = true;
                obj.searchable = true;
                obj.visible = true;
                obj.switchable = true;
                arrayyy.push(obj);
            }
        });
        return arrayyy;
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
            SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
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
            return arrayyy = setcolumnsCommon(test);
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

        },
        buildTable: function($el, profileid) {
            var columns = [],
                subtableArray = [];

            editViewprofileservice.playbtnProfileData(profileid).then(function(response) {
                if (response.data !== undefined && response.data !== "" && response.data !== null && response.data.length > 0) {
                    subtableArray = JSON.parse(response.data[0]);

                    var subArr = [];
                    _.map(JSON.parse(response.data[0]), function(item) {
                        subArr.push({
                            'viewprofileProfileid': item.Profileid,
                            ' Branch-Dor': item.RegistrationDate,
                            'OP/KP': item.paidamount,
                            'OPD/KPD': item.paiddate,
                            'S/R Count': item.sentreceivecount,
                            'PC': item.photocount,
                            'PD': item.PD,
                            'DPD': item.DPD,
                            'View': item.lnkView,
                            'NView': item.notview,
                            'BI': item.bothinterst,
                            'OppI': item.OppI,
                            'View Contact': '',
                            'SA': '',
                            'Horo': '',
                            'Tickets': '',
                            'CustID': item.custid,
                            'Profile Owner': item.OWNER,
                            'HoroPhotoName': item.HoroPhotoName
                        });
                    });
                    var filteredColumns = _.difference(_.keys(subArr[0]), ['CustID', 'HoroPhotoName']);
                    columns = setcolumnsCommon(filteredColumns || _.keys(subArr[0]));
                    $el.bootstrapTable({
                        columns: columns,
                        scrollX: true,
                        data: subArr
                    });
                }
            });
        },
        showAndBindPopup: function(val) {
            modalpopupopen = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: "<div class='modal-header'>" +
                    "        <h3 class='modal-title text-center'>Horoscope image                                               " +
                    "            <a href='javascript:void(0);' onclick='modalpopupopen.close()'>                                       " +
                    "                <ng-md-icon icon='close' style='fill:#c73e5f' class='pull-right' size='25'>Delete</ng-md-icon>   " +
                    "            </a>                                                                                                 " +
                    "        </h3>                                                                                                    " +
                    "    </div>                                                                                                       " +
                    "    <div class='modal-body clearfix' id='modal-body'>                                                            " +
                    "        <img src='" + val + "'  Style='height: 500px; width: 500px;'>                                                                                        " +
                    "    </div>                                                                                                       "
            });

        }
    };
}]);