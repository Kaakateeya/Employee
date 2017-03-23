app.directive("slideShow", ['$uibModal', 'commonpagecc', '$timeout', 'photoalubum',

    function(uibModal, commonpage, timeout, photoalubum) {
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
                scope.currentslide = 1;
                scope.displayArr = [];
                scope.ShowPause = true;
                scope.carousalID = 'myCarousel';
                scope.slidNum = 1;
                scope.slidNumfiled = 1;
                scope.viewedcount = 1;
                scope.prevhide = false;
                scope.tablename = null;
                scope.dynamicslideshow = false;
                scope.personalobj = {};
                scope.arraydata = [];
                scope.data = [];
                scope.popupmodalbody = false;
                scope.HoroscopeImage = "";
                scope.typeofslidedate = "";
                scope.dynamicslideshow = scope.nghide !== undefined && scope.nghide !== "" ? scope.nghide : true;
                scope.displayArray = function(arr, frompage) {
                    console.log(arr);
                    if (frompage === 1) {
                        scope.arraydata = [];
                    }
                    $.each(arr, function(index, item) {
                        scope.data = [];
                        scope.data.push({
                            label: 'ProfileID',
                            value: '',
                            ProfileID: item.ProfileID,
                            KMPLID: item.KMPLID,
                            paid: item.paid,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus
                        });
                        scope.data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        scope.data.push({ label: 'DOB(age)', value: item.DOB + '(' + item.Age + ')' });
                        scope.data.push({ label: 'Height', value: item.Height });
                        scope.data.push({ label: 'Time of Birth', value: item.TOB });
                        scope.data.push({ label: 'Place of Birth', value: item.PlaceOfBirth });
                        scope.data.push({ label: 'Gothram', value: item.Gothram });
                        scope.data.push({ label: 'Caste', value: item.Caste });
                        scope.data.push({ label: 'Marital Status', value: item.maritalstatus || item.MaritalStatusID });
                        scope.data.push({ label: 'Star', value: item.Star });
                        // scope.data.push({ label: 'Color', value: item.Color });
                        scope.data.push({ label: 'Qualification', value: item.EducationGroup + "," + item.EduGroupnamenew });
                        scope.data.push({ label: 'Profession', value: item.Profession });
                        scope.data.push({ label: 'Job Location', value: item.JobLocation });
                        scope.data.push({ label: 'Income(P.M)', value: item.Income });
                        scope.data.push({ label: 'Father Native', value: item.FFNative });
                        scope.data.push({ label: 'Mother Native', value: item.MFNative });
                        scope.data.push({ label: 'Property(Lakhs)', value: item.Property });
                        scope.data.push({
                            label: 'backendFields',
                            Custid: item.Cust_ID,
                            ProfileID: item.ProfileID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            CustPhoto: item.CustomerFullPhoto,
                            totalrecords: item.TotalRowsKeyword
                        });
                        if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null)
                            scope.data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'style= color:red;' });
                        if (item.Intercaste == "True")
                            scope.data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                        if (item.ProfileGrade !== 0)
                            scope.data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        //  if (item.Fromstatus != "--" && item.Fromstatus !== "" && item.Fromstatus !== null)
                        // scope.data.push({ label: 'From status', value: "proceed", style: 'style= color:red;' });
                        //  if (item.Tostatus != "--" && item.Tostatus !== "" && item.Tostatus !== null)
                        // scope.data.push({ label: 'To status', value: "Dont proceed", style: 'style= color:red;' });
                        // if (item.TicketID != "--" && item.TicketID !== "" && item.TicketID !== null)
                        //  scope.data.push({ label: 'TicketID', value: "KAK76768877867", style: 'style= color:red;' });
                        scope.arraydata.push({
                            itmArr: scope.data,
                            custPhoto: item.CustomerFullPhoto,
                            Custid: item.Cust_ID,
                            proceedstatusfrom: "proceed",
                            proceedstatusto: "Dont proceed",
                            Tickid: "KAK7676887",
                            PhotoCount: item.PhotoCount
                        });
                    });
                    return scope.arraydata;
                };
                scope.displayArraydashboard = function(arr, frompage) {
                    console.log(arr);
                    if (frompage === 1) {
                        scope.arraydata = [];
                    }
                    $.each(arr, function(index, item) {
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
                        data.push({ label: 'Dor', value: item.DOR });
                        data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        data.push({ label: 'Web Logins', value: item.LoginCount });
                        // data.push({ label: 'Send/Recv', value: item.SRCount });
                        // data.push({ label: 'payment', value: item.PaidAmount });
                        // data.push({ label: 'Expiry Date', value: item.ExpiryDate });
                        // data.push({ label: 'Points', value: item.Points });
                        data.push({ label: 'backendFields', Custid: item.Cust_ID, ProfileID: item.ProfileID, PhotoCount: item.PhotoCount, Age: item.Age, HeightInCentimeters: item.HeightInCentimeters, MaritalStatusID: item.MaritalStatusID, CasteID: item.CasteID, serviceDate: item.serviceDate, CustPhoto: item.ApplicationPhotoPath, totalrecords: item.TotalRows });
                        scope.arraydata.push({
                            itmArr: data,
                            custPhoto: item.ApplicationPhotoPath,
                            Custid: item.Cust_ID,
                            lastlogin: item.LastLoginDate,
                            matkteingticket: item.TicketID,
                            matchmarktingcount: item.MatchMeetingCount,
                            ownername: item.EmpName,
                            branch: item.KMPLID,
                            reg: item.DOR,
                            SAForm: item.SAForm,
                            primarynumber: item.ContactNumber,
                            primaryemail: item.Email,
                            CreatedDate: item.CreatedDate,
                            SRCount: item.SRCount,
                            PaidAmount: item.PaidAmount,
                            ExpiryDate: item.ExpiryDate,
                            Points: item.Points,
                            mobilestatus: item.CNumberVerStatus,
                            emailstatus: item.CEmailVerStatus,
                            UserName: item.UserName
                        });
                    });
                    return scope.arraydata;
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
                        scope.viewedcount = currentIndex1;
                        if (scope.currentslide < currentIndex1) {
                            if (parseInt(totalItems1) - parseInt(currentIndex1) === 4) {
                                scope.$emit('slideshowsubmit', totalItems1 + 1, totalItems1 + 10, scope.tablename);
                            }
                        }
                        scope.$watch("scope.currentslide", function() {
                            scope.currentslide = scope.currentslide;
                        });
                        scope.$apply();
                        scope.currentslide = currentIndex1;
                    });
                    // scope.currentslide = currentIndex1;
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

                scope.pageload = function(frompage) {
                    scope.displayArr = scope.displayArraydashboard(scope.slidearray, frompage);
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
                scope.gotoSlide = function(e) {

                    var lastslide = parseInt($("#lnkLastSlide").text());
                    if (parseInt($(e).val()) <= lastslide) {
                        $('#myCarousel').carousel(parseInt($(e).val()) - 1);
                        $(e).val('');
                        return false;
                    } else {
                        alert('you can go till ' + lastslide + ' slide only');
                    }
                };
                scope.pauseResume = function(type) {
                    if (type === 'play') {
                        scope.ShowPause = false;
                    } else {
                        scope.ShowPause = true;
                    }
                    commonpage.pausePalyslide(type, scope.carousalID);
                };
                scope.horoscopeimage = function(image) {
                    scope.HoroscopeImage = image;
                    scope.popupmodalbody = true;
                    commonpage.showPopupphotopoup('dynamicphotopopup.html', scope, '', "modalclassdashboardphotopopup");
                };
                scope.slidepopup = function(custid) {
                    photoalubum.getphotoslideimages(custid).then(function(response) {
                        scope.slides = [];
                        _.each(response.data, function(item) {
                            scope.slides.push(item);
                        });
                        commonpage.showPopupphotopoup('dynamicphotopopup.html', scope, '', "modalclassdashboardphotopopup");
                    });

                };
                scope.close = function() {
                    commonpage.closepopup();
                };
                scope.closepopuppoptopopup = function() {
                    commonpage.closepopuppoptopopup();
                };
                scope.$on("slideshowdynamic", function(event, array, totalrows, tablename, frompage) {
                    console.log(tablename);
                    switch (tablename) {
                        case "No-Service From Last 1 Month":
                            scope.typeofslidedate = "Service Date";
                            break;
                        case "Near by offline Expiry":
                        case "Offline Expired Customers":
                        case "Un-Paid Customers":
                            scope.typeofslidedate = "Expired Date";
                            break;
                        case "Inactive Customers":
                            scope.typeofslidedate = "Inactive Date";
                            break;
                        case "Today Remainders":
                            scope.typeofslidedate = "Reminder Date";
                            break;
                        case "Yesterday Proceeding Profiles":
                            scope.typeofslidedate = "proceeding Date";
                            break;
                        case "Tickets Assigned from Last 10 Days":
                        case 'Assigned Profiles from Last 10 Days':
                            scope.typeofslidedate = "Assigned Date";
                            break;

                        case "Email Bounce Info":
                            scope.typeofslidedate = "Bounced On";
                            break;
                    }
                    scope.slidearray = array;
                    // scope.dynamicslideshow = true;

                    if (frompage === 1) {
                        scope.currentslide = 1;
                        scope.lbltotalrecordsslide = totalrows;
                        scope.tablename = tablename;
                        scope.viewedcount = 1;
                        commonpage.showPopup('dynamicSlideshow.html', scope, 'lg', "modalclassdashboard");
                    }
                    timeout(function() {
                        commonpage.ArrowMoveSlide(scope.carousalID);
                        commonpage.moveonenter();
                        // var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                        // if (totalItems1 === 0) {
                        //     commonpage.checkitem(scope.carousalID);
                        // }
                        //commonpage.checkitem(scope.carousalID);
                        scope.bindfunction(scope.carousalID);
                    }, 500);
                    scope.pageload(frompage);
                });
                ////////
                scope.pageloadnew = function(carouselID) {
                    scope.currentslide = 1;
                    var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                    var currentIndex1 = $('#' + scope.carousalID).find('div.active').index() + 1;
                    scope.checkitemnew(carouselID);
                    scope.bindfunction(carouselID);
                    commonpage.ArrowMoveSlide(scope.carousalID);
                    checkitemGlobal(carouselID);
                };
                scope.$on("generalsearchslide", function(event, array, tablename, personalobj, frompage) {
                    console.log(personalobj);
                    scope.personalobj = personalobj;
                    console.log(array);
                    scope.lbltotalrecordsslide = array.length > 0 ? array[0].TotalRows : "";
                    scope.tablename = tablename;
                    scope.slidearray = array;
                    scope.dynamicslideshow = true;
                    scope.displayArr = scope.displayArray(scope.slidearray, frompage);
                    scope.pageloadnew(scope.carousalID);
                });
                scope.backtosearchpage = function() {
                    scope.dynamicslideshow = false;
                    scope.$emit("backsearchshowcontrols");

                };


            }
        };
    }
]);