app.directive("slideShow", ['$uibModal', 'commonpage',

    function(uibModal, commonpage) {
        return {
            restrict: "E",
            scope: {
                slidearray: '=',
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
                return attrs.slidetype === "'page'" ? 'templates/dynamicSlideshow.html' : '';
            },
            link: function(scope, element, attrs) {
                debugger;
                var currentIndex = 1;
                var currentslide = 1;
                var dataarrr = scope.slidearray;
                scope.displayArr = [];
                scope.ShowPause = true;
                scope.carousalID = 'myCarousel';
                scope.slidNum = 1;
                scope.slidNumfiled = 1;
                scope.prevhide = false;
                scope.dynamicslideshow = scope.nghide !== undefined && scope.nghide !== "" ? scope.nghide : true;
                scope.displayArray = function(arr) {
                    var arraydata = [];
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
                        data.push({ label: 'backendFields', Custid: item.Cust_ID, ProfileID: item.ProfileID, PhotoCount: item.PhotoCount, Age: item.Age, HeightInCentimeters: item.HeightInCentimeters, MaritalStatusID: item.MaritalStatusID, CasteID: item.CasteID, serviceDate: item.serviceDate, CustPhoto: item.imageurl, totalrecords: item.TotalRowsKeyword });
                        if (item.serviceDate != "--" && item.serviceDate !== "" && item.serviceDate !== null)
                            data.push({ label: 'ServiceDate', value: item.serviceDate, style: 'style= color:red;' });
                        if (item.Intercaste == "True")
                            data.push({ label: 'Intercaste', value: (item.fathercaste + "/" + item.mothercaste) });
                        if (item.ProfileGrade !== 0)
                            data.push({ label: 'ProfileGrade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });

                        arraydata.push({ itmArr: data, custPhoto: item.imageurl, Custid: item.Cust_ID });
                    });
                    return arraydata;
                };
                scope.bindfunction = function() {
                    $('#' + scope.carousalID).bind('slide.bs.carousel', function() {
                        var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                        var currentIndex1 = $('#' + scope.carousalID).find('div.active').index() + 1;
                        scope.slidNum = currentIndex1;
                        scope.$apply();
                        scope.slidNumfiled = currentIndex1;

                        // scope.$watch(scope.slidNum, function(newvalue, oldvalue) {
                        //     debugger;
                        //     scope.slidNum = currentIndex1;
                        // });
                        if (currentslide < currentIndex1) {
                            if (parseInt(totalItems1) - parseInt(currentIndex1) === 4) {
                                scope.$emit('slideshowsubmit', totalItems1 + 1, totalItems1 + 10);
                            }

                        }
                    });
                    commonpage.checkitem(scope.carousalID);
                };
                scope.pageload = function() {
                    scope.displayArr = scope.displayArray(scope.slidearray);

                    commonpage.ArrowMoveSlide(scope.carousalID);
                    commonpage.moveonenter();
                    var totalItems1 = $('#' + scope.carousalID).find('.item').length;
                    var currentIndex1 = $('#' + scope.carousalID).find('div.active').index() + 1;

                    scope.slidNum = currentIndex1 + 1;
                    scope.slidNumfiled = currentIndex1 + 1;
                    if (totalItems1 === 0) {
                        commonpage.checkitem(scope.carousalID);
                    }

                    scope.bindfunction();
                };
                scope.pageload();
                if (scope.slidetype === 'popup') {
                    if (scope.dynamicslideshow === true) {
                        commonpage.showPopup('templates/dynamicSlideshow.html', scope, 'lg');
                    }
                }
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
                // scope.$on("arrayupdate", function(event, array) {
                //     scope.displayArr = scope.displayArray(array);
                // });

                scope.$on("slideshowdynamic", function(event) {
                    debugger;
                    scope.dynamicslideshow = true;
                    commonpage.showPopup('templates/dynamicSlideshow.html', scope, 'lg');
                });
            }

        };
    }
]);