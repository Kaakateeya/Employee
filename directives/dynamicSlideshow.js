app.directive("slideShow", ['$uibModal', 'modelpopupopenmethod', '$timeout', 'SelectBindServiceApp',
    'alert', 'getArraysearch', '$window',

    function(uibModal, commonpage, timeout, SelectBindServiceApp, alerts, getArray, window) {
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
                nghide: '=',
                pagename: '='
            },
            templateUrl: function(element, attrs, scope) {
                return (attrs.slidetype === "'page'" ? 'templates/dynamicSlideshow.html' : 'templates/dynamicSlideshow.html');
            },
            link: function(scope, element, attrs) {
                var currentIndex = 1;
                scope.dynamicphotopopupheader = "Photo Album";
                scope.headerhtml = "";
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
                scope.mobileVerificationCode = null;
                scope.custfamilyID = null;
                scope.modalbodyID1 = "";
                scope.BranchName = [];
                scope.BranchName = getArray.GArray('BranchName');
                scope.dynamicslideshow = scope.nghide !== undefined && scope.nghide !== "" ? scope.nghide : true;
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
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopeImage: item.HoroscopeImage
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        data.push({ label: 'Caste', value: item.MotherTongue + "-" + item.Caste });
                        data.push({ label: 'Dor', value: item.DOR });
                        data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        data.push({
                            label: 'backendFields',
                            Custid: item.Cust_ID,
                            ProfileID: item.ProfileID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            CustPhoto: item.ApplicationPhotoPath,
                            totalrecords: item.TotalRows
                        });
                        scope.arraydata.push({
                            itmArr: data,
                            custPhoto: item.ApplicationPhotoPath,
                            Custid: item.Cust_ID,
                            lastlogin: item.LastLoginDate,
                            logincount: item.LoginCount,
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
                            UserName: item.UserName,
                            Reason4InActive: item.Reason4InActive,
                            ProfileID: item.ProfileID,
                            CountryCodeID: item.CountryCodeID,
                            Cust_Family_ID: item.Cust_Family_ID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            bouncedEmailID: item.EmailID,
                            bouncedemailentryid: item.Cust_EmailBounceEntryId
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
                scope.horoscopeimage = function(image, type) {
                    scope.HoroscopeImage = image;
                    scope.popupmodalbody = true;
                    if (type === "SA") {
                        scope.dynamicphotopopupheader = "SA FORM";
                    } else {
                        scope.dynamicphotopopupheader = "Horoscope Image";
                    }
                    commonpage.showPopupphotopoup('dynamicphotopopup.html', scope, '', "modalclassdashboardphotopopup");
                };
                scope.slidepopup = function(custid) {
                    scope.dynamicphotopopupheader = "Photo Album";
                    scope.slides = [];
                    scope.popupmodalbody = false;
                    SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
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
                    scope.headerhtml = tablename;
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
                        case "SA Form status for Paid Users":
                            scope.typeofslidedate = "Upload Date";
                            break;
                        case "Present In India":
                            scope.typeofslidedate = "ArrivalDate at";
                            break;
                        case "Marketing Ticket Expiry With in Two days":
                            scope.typeofslidedate = "Ticket Exipry Date";
                            break;
                        case "Customer Notification Status":
                            scope.typeofslidedate = "Action Date";
                            break;

                    }
                    scope.slidearray = array;
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
                scope.forgetpassword = function(usernamepassword) {
                    SelectBindServiceApp.forgotpasswordemail(usernamepassword).then(function(response) {
                        console.log(response.data);
                        if (response.data === 1) {
                            alert('Mail sent to your email, To reset your password check your mail');
                        }
                    });
                };
                scope.saformupload = function(profileid) {
                    scope.$emit('saformuploadsubmit', profileid);

                };
                scope.sendMobileCode = function(iCountryID, iCCode, MobileNumber, CustFamilyID) {
                    var obj = {
                        iCountryID: iCountryID,
                        iCCode: iCCode,
                        MobileNumber: MobileNumber,
                        CustFamilyID: CustFamilyID
                    };
                    scope.custfamilyID = CustFamilyID;
                    scope.popupMobilenumber = MobileNumber;
                    SelectBindServiceApp.sendMobileCode(obj).then(function(response) {
                        console.log(response.data);
                        scope.mobileVerificationCode = response.data;
                        commonpage.showPopupphotopoup('verifyMobileContent.html', scope, '', "modalclassdashboardphotopopup");
                    });
                };
                scope.verifymail = function(custID) {
                    SelectBindServiceApp.verifyEmail(custID).then(function(response) {
                        console.log(response);
                        if (response.data !== undefined) {
                            if (response.data === 1) {
                                alert('Email verify mail send Successfully');
                            }
                        }
                    });
                };
                scope.verifyMobCode = function(val) {
                    if (val === "") {
                        alerts.timeoutoldalerts(scope, 'alert-danger', 'Please enter Mobile verify Code', 4500);
                    } else if (scope.mobileVerificationCode === val) {

                        SelectBindServiceApp.verifyMobile(scope.mobileVerificationCode, scope.custfamilyID).then(function(response) {
                            console.log(response);
                            commonpage.closepopuppoptopopup();
                        });
                    } else {
                        alert('Please Enter Valid Verification code');
                    }
                };

                scope.viewfullprofile = function(profileid) {
                    window.open("Viewfullprofile/" + profileid, "_blank");
                };
                scope.paymentpage = function(profileid) {
                    window.open("EmployeePayments" + "?idsss=" + profileid, "_blank");
                };

                scope.pagesredirect = function(type, custid) {
                    switch (type) {
                        case "Partner":
                            window.open("Partnerpreference/" + custid, "_blank");
                            break;
                        case "general":
                            window.open("search/" + custid, "_blank");
                            break;
                        case "contacts":
                            window.open("Contact/" + custid, "_blank");
                            break;
                    }

                };
                scope.dynamicPopover = {
                    content: 'Hello, World!',
                    templateUrl: 'myPopoverTemplate.html',
                    title: 'Ticket History'
                };

                scope.openTicketPopup = function() {
                    commonpage.showPopup('Actions.html', scope, 'lg', "Action");
                };

                scope.photorequest = function(profileid) {
                    scope.$emit("photorequest", profileid);
                };

                scope.updatebouncedemail = function(entryid, email, Custid) {
                    scope.$emit("updatebouncedemailmethod", entryid, email, Custid);
                };
            }
        };
    }
]);