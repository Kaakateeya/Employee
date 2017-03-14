app.directive("slideShow", ['$uibModal', 'commonpage', '$timeout',

    function(uibModal, commonpage, timeout) {
        return {
            restrict: "E",
            scope: {
                slidetype: '=',
                showshortlist: '=',
                fromcustid: '=',
                fromprofileid: '=',
                totalrecord: '=',
                inputobj: '=',
                api: '=',
                empid: '=',
                backtosearch: '=',
                links: '=',
                resultarray: '=',
                dynamicheader: '=',
                bodytemplate: '=',
                headertemplate: '=',
                nghide: '='
            },
            templateUrl: function(element, attrs, scope) {
                return attrs.slidetype === "'page'" ? 'templates/dynamicSlideshow.html' : 'templates/dynamicSlideshow.html';
            },
            link: function(scope, element, attrs) {
                var currentIndex = 1;
                var currentslide = 1;
                scope.displayArr = [];
                scope.ShowPause = true;
                scope.carousalID = 'myCarousel';
                scope.slidNum = 1;
                scope.slidNumfiled = 1;
                scope.prevhide = false;
                scope.tablename = null;
                scope.dynamicslideshow = false;
                scope.dynamicslideshow = scope.nghide !== undefined && scope.nghide !== "" ? scope.nghide : true;
                scope.displayArray = function(arr) {
                    var arraydata = [];
                    _.each(arr, function(index, item) {
                        var data = [];
                        data.push({
                            label: 'ProfileID',
                            value: '',
                            ProfileID: item.ProfileID,
                            KMPLID: item.KMPLID,
                            paid: item.paid,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        data.push({ label: 'DOB(age)', value: item.DOB + '(' + item.Age + ')' });
                        data.push({ label: 'Time of Birth', value: item.TOB });
                        data.push({ label: 'Place of Birth', value: item.PlaceOfBirth });
                        data.push({ label: 'Gothram', value: item.Gothram });
                        data.push({ label: 'Caste', value: item.Caste });
                        data.push({ label: 'Marital Status', value: item.maritalstatus || item.MaritalStatusID });
                        data.push({ label: 'Star', value: item.Star });
                        data.push({ label: 'Color', value: item.Color });
                        data.push({ label: 'Height', value: item.Height });
                        data.push({ label: 'Qualification', value: item.EducationGroup + "," + item.EduGroupnamenew });
                        data.push({ label: 'Profession', value: item.Profession });
                        data.push({ label: 'Job Location', value: item.JobLocation });
                        data.push({ label: 'Income(P.M)', value: item.Income });
                        data.push({ label: 'Father Native', value: item.FFNative });
                        data.push({ label: 'Mother Native', value: item.MFNative });
                        data.push({ label: 'Property(Lakhs)', value: item.Property });
                        data.push({ label: 'backendFields', Custid: item.Cust_ID, ProfileID: item.ProfileID, PhotoCount: item.PhotoCount, Age: item.Age, HeightInCentimeters: item.HeightInCentimeters, MaritalStatusID: item.MaritalStatusID, CasteID: item.CasteID, serviceDate: item.serviceDate, CustPhoto: item.FullPath, totalrecords: item.TotalRowsKeyword });
                        if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null)
                            data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'style= color:red;' });
                        if (item.Intercaste == "True")
                            data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                        if (item.ProfileGrade !== 0)
                            data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        arraydata.push({ itmArr: data, custPhoto: item.FullPath, Custid: item.Cust_ID });
                    });
                    return arraydata;
                };

                scope.displayArraydashboard = function(arr) {
                    var arraydata = [];
                    _.each(arr, function(index, item) {
                        var data = [];
                        data.push({
                            label: 'ProfileID',
                            value: '',
                            ProfileID: item.ProfileID,
                            KMPLID: item.KMPLID,
                            paid: item.paid,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        data.push({ label: 'Caste', value: item.Caste });
                        data.push({ label: 'Dor', value: item.Dor });
                        data.push({ label: 'Mother Native', value: item.MFNative });
                        data.push({ label: 'Property(Lakhs)', value: item.Property });
                        data.push({ label: 'backendFields', Custid: item.Cust_ID, ProfileID: item.ProfileID, PhotoCount: item.PhotoCount, Age: item.Age, HeightInCentimeters: item.HeightInCentimeters, MaritalStatusID: item.MaritalStatusID, CasteID: item.CasteID, serviceDate: item.serviceDate, CustPhoto: item.FullPath, totalrecords: item.TotalRowsKeyword });
                        if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null)
                            data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'style= color:red;' });
                        if (item.Intercaste == "True")
                            data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                        if (item.ProfileGrade !== 0)
                            data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        arraydata.push({ itmArr: data, custPhoto: item.FullPath, Custid: item.Cust_ID });
                    });
                    return arraydata;
                };

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
                scope.bindfunction = function(carouselID) {
                    $('#' + carouselID).bind('slide.bs.carousel', function(e) {
                        $('.list-inline li a').removeClass('selected');
                        $('[id=carousel-selector-' + $('#' + carouselID).find('div.active').index() + ']').addClass('selected');
                        var totalItems1 = $('#' + carouselID).find('.item').length;
                        var currentIndex1 = $('#' + carouselID).find('div.active').index() + 1;
                        $('#' + carouselID).find('div.active').index();
                        if (currentslide < currentIndex1) {
                            debugger;
                            if (parseInt(totalItems1) - parseInt(currentIndex1) === 4) {
                                scope.$emit('slideshowsubmit', totalItems1 + 1, totalItems1 + 10, scope.tablename);
                            }
                        }
                        currentslide = currentIndex1;
                    });
                };

                function checkitemGlobal(carouselID) {
                    var checkitem = function() {
                        scope.checkitemnew(carouselID);
                    };
                    $("#" + carouselID).on("slid.bs.carousel", "", checkitem);
                }
                scope.playslide = function() {
                    scope.playpausebuttons = true;
                    scope.pauseplaybuttons = false;
                    $('#' + scope.carousalID).carousel({
                        interval: 2000,
                        pause: "false"
                    });
                };
                scope.pauseslide = function() {
                    scope.playpausebuttons = false;
                    scope.pauseplaybuttons = true;
                    $('#' + scope.carousalID).carousel('pause');
                };

                scope.pageload = function() {
                    scope.displayArr = scope.displayArraydashboard(scope.slidearray);
                    var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                    var currentIndex1 = $('#' + scope.carousalID).find('div.active').index() + 1;
                    scope.slidNum = currentIndex1 + 1;
                    scope.slidNumfiled = currentIndex1 + 1;

                };
                // if (scope.slidetype === 'popup') {
                //     if (scope.dynamicslideshow === true) {
                //         commonpage.showPopup('templates/dynamicSlideshow.html', scope, 'lg');
                //     }
                // }
                scope.pauseResume = function(type) {
                    if (type === 'play') {
                        scope.ShowPause = false;
                    } else {
                        scope.ShowPause = true;
                    }
                    commonpage.pausePalyslide(type, scope.carousalID);
                };
                scope.slidepopup = function(custid) {
                    commonpage.ShowPhotoPopup(custid, scope);
                };
                scope.close = function() {
                    commonpage.closepopup();
                };
                scope.$on("slideshowdynamic", function(event, array, totalrows, tablename, frompage) {
                    scope.slidearray = array;
                    // scope.dynamicslideshow = true;
                    scope.lbltotalrecordsslide = totalrows;
                    scope.tablename = tablename;
                    if (frompage === 1) {
                        commonpage.showPopup('dynamicSlideshow.html', scope, 'lg', "modalclass");
                    }
                    timeout(function() {
                        commonpage.ArrowMoveSlide(scope.carousalID);
                        commonpage.moveonenter();
                        // var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                        // if (totalItems1 === 0) {
                        //     commonpage.checkitem(scope.carousalID);
                        // }
                        //commonpage.checkitem(scope.carousalID);
                        scope.bindfunction();
                    }, 500);
                    scope.pageload();
                });
                ////////
                scope.pageloadnew = function(carouselID) {
                    currentslide = 1;
                    var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                    var currentIndex1 = $('#' + scope.carousalID).find('div.active').index() + 1;
                    scope.checkitemnew(carouselID);
                    scope.bindfunction(carouselID);
                    commonpage.ArrowMoveSlide(scope.carousalID);
                    checkitemGlobal(carouselID);
                };
                scope.$on("generalsearchslide", function(event, array, tablename) {
                    scope.tablename = tablename;
                    scope.slidearray = array;
                    scope.dynamicslideshow = true;
                    scope.displayArr = scope.displayArray(scope.slidearray);
                    scope.pageloadnew(scope.carousalID);
                });
            }
        };
    }
]);