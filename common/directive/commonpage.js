app.factory('commonpage', ['$uibModal', 'editViewprofileservice',

    function(uibModal, editViewprofileservice) {
        var modalinstance;
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
        operateFormatter = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>" + row.ProfileID + "</a>";
            return paid;
        };

        // operateFormatter = function(value, row, index) {
        //     var paid = "<a style='cursor:pointer;'  href='/EmployeePaymentInserts/" + row.ProfileID + "'>" + row.ProfileID + "</a>";
        //     return paid;
        // };
        ViewContact = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='/Contact/" + row.CustID + "'>View Conatact</a>";
            return paid;
        };
        viewSa = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='javascript:void(0);' onclick='showAndBindPopup();'>View</a>";
            return paid;
        };
        ViewHoro = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='javascript:void(0);'>View</a>";
            return paid;
        };
        ViewTicket = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>View</a>";
            return paid;
        };
        ViewProfile = function(value, row, index) {
            var paid = "<a style='cursor:pointer;'  href='javascript:void(0);'>" + row.viewprofileProfileid + "</a>";
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
        showAndBindPopup = function() {
            alert(1111111);
            // _.each(model.FPobj, function(item) {
            //     debugger;
            //     // model.SlideArr.push({ FullPhotoPath: editviewapp.GlobalImgPath + "Images/ProfilePics/KMPL_" + CustID + "_Images/" + (item.PhotoName.slice(0, 4)).replace("i", "I") + "_Images/" + model.PersonalObj.ProfileID + "_FullPhoto.jpg" });
            // });
            // modalpopupopen = uibModal.open({
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     templateUrl: 'templates/normalPopup.html',
            //     scope: scope,
            //     size: size,
            //     backdrop: 'static'
            //         // keyboard: false
            // });
        };
        return {
            showPopup: function(url, scope, size) {
                modalpopupopen = uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: url,
                    scope: scope,
                    size: size,
                    backdrop: 'static'
                        // keyboard: false
                });
            },
            closepopup: function() {
                modalpopupopen.close();
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
                // photoalubum.getphotoslideimages(custid).then(function(response) {
                //     scope.slides = [];
                //     _.each(response.data, function(item) {
                //         scope.slides.push(item);
                //     });
                // });
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
                                'Profile Owner': item.OWNER
                            });
                        });
                        var filteredColumns = _.difference(_.keys(subArr[0]), ['CustID']);
                        columns = setcolumnsCommon(filteredColumns || _.keys(subArr[0]));
                        $el.bootstrapTable({
                            columns: columns,
                            data: subArr
                        });
                        $el.append('<tr class="child"><td colspan="17" style="text-align:center;background: #7da1a1;color:#fff !important;">PD-->Proceed,    DPD--->dont Proceed,    BI--->Both side interest,    OppI-->opposite interest,    PC-->Photo Count,    SA-->Settle   </td></tr>');
                    }
                });
            }
        };
    }
]);