app.factory('modelpopupopenmethod', ['$uibModal', 'SelectBindServiceApp', '$timeout', 'authSvc', '$http',
    function(uibModal, SelectBindServiceApp, timeout, authSvc, http) {
        var modalinstance, modalpopupopen, modalpopupopenphoto, modalpopupopenthird;
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
                    windowClass: classp,
                    keyboard: false
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
                    windowClass: classp,
                    keyboard: classp === 'modalclassdashboardphotopopup123' ? false : false
                });
            },

            thirdshowPopup: function(url, scope, size, classp) {
                modalpopupopenthird = uibModal.open({
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
            thirdClosepopup: function() {
                modalpopupopenthird.close();
            },
            pausePalyslide: function(type, id) {
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

            ShowPhotoPopup: function(custid, scope) {
                SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
                    scope.slides = [];
                    _.each(response.data, function(item) {
                        scope.slides.push(item);
                    });
                });
                timeout(function() {
                    modalpopupopen = uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'templates/dynamicPhotoPopup.html',
                        scope: scope,
                        backdrop: 'static',
                        keyboard: true
                    });
                }, 500);

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
            showAndBindPopup: function(val) {
                modalpopupopen = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: "<div class='modal-header'>" +
                        "        <h3 class='modal-title text-center'>Horoscope image                                               " +
                        "            <a href='javascript:void(0);' compile ng-click='close()'>                                       " +
                        "                <ng-md-icon icon='close' style='fill:#c73e5f' class='pull-right' size='25'>Delete</ng-md-icon>   " +
                        "            </a>                                                                                                 " +
                        "        </h3>                                                                                                    " +
                        "    </div>                                                                                                       " +
                        "    <div class='modal-body clearfix' id='modal-body'>                                                            " +
                        "        <img src='" + val + "'  Style='height: 500px; width: 500px;'>                                                                                        " +
                        "    </div>                                                                                                       "
                });
            },
            getloginpage: function(form) {
                return http.get(app.apiroot + 'DB/getValidateLoginNew', {
                    params: {
                        LoginName: form.usernameemployeeid,
                        Password: form.passwordemployee,
                        sMAC: authSvc.clientIp()
                    }
                });
            },
            getEmployeeLoginCoutDetails: function() {
                return http.get(app.apiroot + 'StaticPages/getEmployeeLoginCoutDetails', {
                    params: {}
                });
            },
            getNumForPrintOrderbind: function(count) {
                var arr = [];
                arr.push({ "label": "--Select--", "title": "--Select--", "value": '' });
                for (var i = 1; i <= count; i++) {
                    arr.push({ "label": "p" + i, "title": "p" + i, "value": i });
                }
                return arr;
            },
            getnumberbind: function(fromval, Toval, str, incrementval) {
                var options = [];
                options.push({ label: str, title: str, value: "" });
                for (var i = fromval; i <= Toval; i += incrementval) {
                    if (i < 10) {
                        options.push({ label: "0" + i + " " + str, title: "0" + i + " " + str, value: (parseInt(i) + 1) });
                    } else {

                        options.push({ label: i + " " + str, title: i + " " + str, value: (parseInt(i) + 1) });
                    }
                }
                return options;
            },
            getChangeEmployeePassword: function(EmpID, EmpoldPassword, EmpNewPassword) {
                return http.get(app.apiroot + 'EmployeeReportPage/getChangeEmployeePassword', {
                    params: { EmpID: EmpID, EmpoldPassword: EmpoldPassword, EmpNewPassword: EmpNewPassword }
                });
            },
            getCheckemployeePassord: function(EmpID, Emppassword) {
                return http.get(app.apiroot + 'EmployeeReportPage/getCheckemployeePassord', {
                    params: { EmpID: EmpID, Emppassword: Emppassword }
                });
            },
            getpresentunpaidmembers: function(Empid) {
                return http.get(app.apiroot + 'EmployeeReportPage/getpresentunpaidmembers', {
                    params: { EmpID: Empid }
                });
            }
        };
    }
]);