angular.module('Kaakateeya').directive("complexSlide", ['$timeout', 'modelpopupopenmethod', 'SelectBindServiceApp',
    function(timeout, modelpopupopenmethod, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '='
            },
            templateUrl: "directives/complex-slide/index.html",
            link: function($scope, element, attrs) {
                $scope.myInterval = 0;
                $scope.noWrapSlides = true;
                $scope.activeslide = 0;
                $scope.mainshortlist = false;
                $scope.Viwedslide = 1;
                $scope.playbutton = false;
                $scope.isPrevDisabled = function() {
                    if ($scope.activeslide === 0) {
                        return true;
                    }
                };
                $scope.isNextDisabled = function() {
                    if ($scope.activeslide === model.totalRecords) {
                        return true;
                    }
                };
                $scope.width = "";
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
                        $scope.activeslide = parseInt(slideIndex) - 1;
                        slideIndex = 0;
                    }
                };
                $scope.$watch('activeslide', function(news, old) {
                    if (news !== undefined && news !== "" && news !== null) {
                        $scope.Viwedslide = news;
                        $scope.config.slidebind(old, news, $scope.model.slides, $scope.model.typeofPage);
                        $scope.isPrevDisabled();
                        $scope.isNextDisabled();
                    }
                });
                $scope.slidepopup = function(custid) {
                    SelectBindServiceApp.getphotoslideimages(custid).then(function(response) {
                        $scope.slidephotos = [];
                        $scope.popupmodalbody = false;
                        _.each(response.data, function(item) {
                            $scope.slidephotos.push(item);
                        });
                        modelpopupopenmethod.showPopupphotopoup('dynamicphotopopup.html', $scope, '', "modalclassdashboardphotopopup");
                    });
                };
                $scope.horoscopeimage = function(image) {
                    $scope.HoroscopeImage = image;
                    $scope.popupmodalbody = true;
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
            }
        };
    }
]);