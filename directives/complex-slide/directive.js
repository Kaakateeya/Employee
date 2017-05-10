angular.module('Kaakateeya').directive("complexSlide", ['$timeout', 'modelpopupopenmethod', 'SelectBindServiceApp',
    'helperservice', 'alert', 'fileUpload', '$filter',
    function(timeout, modelpopupopenmethod, SelectBindServiceApp, helperservice, alerts, fileUpload, $filter) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '='
            },
            templateUrl: "directives/complex-slide/index.html",
            link: function($scope, element, attrs) {
                $scope.myInterval = 0;
                $scope.myIntervalphoto = 0;
                $scope.noWrapSlides = true;
                $scope.noWrapSlidesphoto = true;
                $scope.activeslide = 0;
                $scope.activeslidephoto = 0;
                $scope.mainshortlist = false;
                $scope.Viwedslide = 0;
                $scope.playbutton = false;
                $scope.width = "";
                $scope.photoalbum = "Photo Album";
                $scope.uploadfromsubmit = false;
                $scope.txtGotoVal = "";
                $scope.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
                $scope.pauseResume = function(action) {
                    if (action === 'play') {
                        $scope.myInterval = 5000;
                        $scope.playbutton = true;
                    } else {
                        $scope.myInterval = 0;
                        $scope.playbutton = false;
                    }
                };

                $scope.gotoSlide = function(slideIndex) {
                    if (slideIndex !== undefined && slideIndex !== "" && slideIndex !== null && slideIndex !== 0 &&
                        slideIndex !== "0") {
                        if (slideIndex > $scope.Viwedslide) {
                            alerts.timeoutoldalerts($scope, 'alert-danger', "you can go till " + (($scope.Viwedslide) + 1) + " slide only", 4000);
                        } else {
                            $scope.activeslide = parseInt(slideIndex) - 1;
                            slideIndex = 0;
                        }
                        $scope.txtGotoVal = "";
                        //$scope.apply();
                    }
                };

                $scope.$watch('activeslide', function(news, old) {
                    if (news !== undefined && news !== "" && news !== null) {
                        $scope.Viwedslide = news > $scope.Viwedslide ? news : $scope.Viwedslide;
                        $scope.config.slidebind(old, news, $scope.model.slides, $scope.model.typeofPage);
                    } else {
                        $scope.Viwedslide = 0;
                    }
                });

                $scope.slidepopup = function(custid) {
                    $scope.photoalbum = "Photo Album";
                    $scope.slidephotos = [];
                    SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
                        $scope.slidephotos = [];
                        $scope.popupmodalbody = false;
                        _.each(response.data, function(item) {
                            $scope.slidephotos.push(item);
                        });
                        modelpopupopenmethod.showPopupphotopoup('dynamicphotopopup.html', $scope, '', "modalclassdashboardphotopopup");
                    });
                };
                $scope.horoscopeimage = function(image, type) {
                    $scope.photoalbum = "Horoscope Image";
                    $scope.HoroscopeImage = image;
                    $scope.popupmodalbody = true;
                    if (type === "SA") {
                        $scope.photoalbum = "SA FORM";
                    } else {
                        $scope.photoalbum = "Horoscope Image";
                    }
                    modelpopupopenmethod.showPopupphotopoup('dynamicphotopopup.html', $scope, '', "modalclassdashboardphotopopup");
                };
                $scope.ngclassprogress = function(slidelength) {
                    $scope.progressbar = [];
                    var classslide = "";
                    $scope.progressbar = _.where(slidelength, { isShortlisted: true });
                    $scope.width = $scope.progressbar.length + "%";
                    if ($scope.progressbar.length <= 10) {
                        classslide = "progress-bar progress-bar-striped progress-bar-danger active";
                    } else if ($scope.progressbar.length > 10 && $scope.progressbar.length <= 30) {
                        classslide = "progress-bar progress-bar-striped progress-bar-warning active";
                    } else if ($scope.progressbar.length > 30 && $scope.progressbar.length <= 50) {
                        classslide = "progress-bar progress-bar-striped progress-bar-info active";
                    } else {
                        classslide = "progress-bar progress-bar-striped progress-bar-success active";
                    }
                    return classslide;
                };
                /////slide events

                $scope.closepopuppoptopopup = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                $scope.viewfullprofile = function(ProfileID) {
                    window.open('/Viewfullprofile/' + ProfileID, '_blank');
                };
                $scope.forgetpassword = function(ProfileID) {
                    SelectBindServiceApp.forgotpasswordemail(ProfileID).then(function(response) {
                        if (response.data === 1) {
                            alerts.timeoutoldalerts($scope, 'alert-success', 'Mail sent to your email, To reset your password check your mail', 4000);
                        }
                    });
                };
                $scope.paymentpage = function(ProfileID) {
                    window.open("EmployeePayments" + "?idsss=" + ProfileID, "_blank");
                };
                $scope.tickethistoryupdate = function(matkteingticket) {
                    debugger;
                    $scope.model.marketingTicket = matkteingticket;
                    modelpopupopenmethod.showPopupphotopoup('marketpopup.html', $scope, 'md', "modalclassdashboardphotopopup");
                };
                $scope.photorequest = function(ProfileID, empid) {
                    helperservice.PhotoRequest(ProfileID, empid).then(function(response) {
                        if (response !== undefined && response !== null && response !== "" && response.data !== undefined) {
                            if (response.data === 1) {
                                alerts.timeoutoldalerts($scope, 'alert-success', 'PhotoRequest send successfully', 4000);
                            } else {
                                alerts.timeoutoldalerts($scope, 'alert-danger', 'PhotoRequest send Failed', 4000);
                            }
                        }
                    });
                };
                $scope.verifymail = function(custid) {
                    SelectBindServiceApp.verifyEmail(custid).then(function(response) {
                        if (response.data !== undefined) {
                            if (response.data === 1) {
                                alerts.timeoutoldalerts($scope, 'alert-success', 'Email verify mail send Successfully', 4000);
                            }
                        }
                    });
                };
                $scope.sendMobileCode = function(slide) {
                    var obj = {
                        iCountryID: slide.CountryCodeID,
                        iCCode: slide.CountryCodeID,
                        MobileNumber: slide.primarynumber,
                        CustFamilyID: slide.Cust_Family_ID
                    };
                    $scope.custfamilyID = slide.Cust_Family_ID;
                    $scope.popupMobilenumber = slide.primarynumber;
                    SelectBindServiceApp.sendMobileCode(obj).then(function(response) {
                        $scope.mobileVerificationCode = response.data;
                        modelpopupopenmethod.showPopupphotopoup('verifyMobileContent.html', $scope, '', "modalclassdashboardphotopopup");
                    });
                };

                $scope.verifyMobCode = function(val) {
                    if (val === "") {
                        alerts.timeoutoldalerts($scope, 'alert-danger', 'Please enter Mobile verify Code', 4500);
                    } else if ($scope.mobileVerificationCode === val) {
                        SelectBindServiceApp.verifyMobile($scope.mobileVerificationCode, $scope.custfamilyID).then(function(response) {
                            modelpopupopenmethod.closepopuppoptopopup();
                            alerts.timeoutoldalerts($scope, 'alert-success', 'Mobile Verified Successfully', 4500);
                        });
                    } else {
                        alert('Please Enter Valid Verification code');
                    }
                };
                $scope.updatebouncedemail = function(slide) {
                    $scope.entryid = slide.bouncedemailentryid;
                    $scope.emailbounce = slide.bouncedEmailID;
                    $scope.Custidbounce = slide.Custid;
                    $scope.uploadfromsubmit = true;
                    modelpopupopenmethod.showPopupphotopoup('uploadsaform.html', $scope, 'sm', "modalclassdashboardphotopopup");
                };
                $scope.saformupload = function(profileid) {
                    $scope.proceedprofileid = profileid;
                    $scope.uploadfromsubmit = false;
                    modelpopupopenmethod.showPopupphotopoup('uploadsaform.html', $scope, 'sm', "modalclassdashboardphotopopup");
                };
                $scope.pagesredirect = function(type, custid, profileid) {
                    switch (type) {
                        case "Partner":
                            window.open("Partnerpreference/" + custid, "_blank");
                            break;
                        case "general":
                            window.open("search/" + custid + "/" + profileid, "_blank");
                            break;
                        case "contacts":
                            window.open("Contact/" + custid, "_blank");
                            break;
                        case 'myprofile':
                            window.open("myProfilepage?Profileid=" + profileid, "_blank");
                            break;
                        case 'marketing':
                            window.open("marketingpage", "_blank");
                            break;
                        case 'matchfollowup':
                            window.open("matchFollowuppage", "_blank");
                            break;
                        case 'nopage':
                            alerts.timeoutoldalerts($scope, 'alert-danger', 'comming Soon page', 4500);
                            break;
                    }
                };

                $scope.upload = function(obj) {
                    var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
                    extension = angular.lowercase(extension);
                    var gifFormat = "gif,jpeg,jpg";
                    if (typeof(obj.myFile.name) != "undefined") {
                        var size = obj.myFile.size;
                        if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                            alert('Your uploaded image contains an unapproved file formats.');
                        } else if (size > 4194304) {
                            alert('Sorry,Upload Photo Size Must Be Less than 4 mb');
                        } else {
                            var keyname = app.prefixPath + $scope.proceedprofileid + '_settlementImages' + '/' + $scope.proceedprofileid + '_settlementImages.' + extension;
                            fileUpload.uploadFileToUrl(obj.myFile, '/settlementformupload', keyname).then(function(res) {
                                if (res.status == 200) {
                                    modelpopupopenmethod.closepopuppoptopopup();
                                    var today = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm:ss a');
                                    var object = {
                                        CreatedByEmpID: $scope.model.empid,
                                        CreatedDate: today,
                                        ModifiedByEmpID: $scope.model.empid,
                                        ModifiedEmpDate: today,
                                        SettlementAgreedAmount: 0,
                                        Notes: "",
                                        isActive: 0,
                                        Settlementfrompath: '~/Images/SettlementImages/' + $scope.proceedprofileid + '_settlementImages/' + $scope.proceedprofileid + '_settlementImages.' + extension,
                                        isassigned: 0,
                                        ReferenceID: 0,
                                        Profileidnew: $scope.proceedprofileid
                                    };
                                    helperservice.uploadsettlementform(object).then(function(response) {
                                        if (response !== undefined && response.data === 1) {
                                            alerts.timeoutoldalerts($scope, 'alert-success', 'SA Form Uploaded successfully', 2000);
                                        } else {
                                            alerts.timeoutoldalerts($scope, 'alert-danger', 'SA Form Uploaded Failed', 2000);
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        alert("This browser does not support HTML5.");
                    }
                };

                $scope.bouncedemail = function(obj) {
                    var object = {
                        CustID: $scope.Custidbounce,
                        EmailBounceEntryId: $scope.entryid,
                        BounceMailid: obj.newemail
                    };
                    helperservice.getUpdateEmailBounce(object).then(function(response) {
                        if (response !== undefined && response.data === 1) {
                            modelpopupopenmethod.closepopuppoptopopup();
                            alerts.timeoutoldalerts($scope, 'alert-success', 'Email Updated successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts($scope, 'alert-danger', 'Email Updated Failed', 2000);
                        }
                    });
                };

                $scope.notificationread = function(slide, index, parentid) {
                    var obj = {
                        EmpID: $scope.model.empid,
                        idisplay: 2,
                        NotificationID: slide.Cust_NotificationID,
                        CategoryID: slide.CategoryID,
                        CustID: slide.Custid
                    };
                    helperservice.readNotifications(obj).then(function(response) {
                        if (response.data !== undefined) {
                            alerts.timeoutoldalerts($scope, 'alert-success', 'Notification Readed successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts($scope, 'alert-danger', 'Notification Read Failed', 2000);
                        }
                    });
                };


            }
        };
    }
]);