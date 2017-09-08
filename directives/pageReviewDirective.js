(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .directive('pageReview', directive);
    directive.$inject = ['commonFactory', '$uibModal', 'baseService', 'baseModel', 'authSvc', '$timeout'];

    function directive(commonFactory, uibModal, baseService, baseModel, authSvc, timeout) {
        var model = baseModel;
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                sectionid: '=',
                dispalyName: '=',
                custid: '='
            },
            template: "<div class='employee_review_check clearfix' ng-show='showChk'>" +
                "<md-checkbox ng-model='val' page-Review style='padding: 9px 13px 0px 0px;' ng-change='reviewonchange(val);' class='pull-right' name='chkboxedu' ><span style='color: black;'>Review</span>" +
                "</md-checkbox>" +
                "<div class='clearfix'></div>" +
                "</div>",
        };
        return directive;

        function link(scope, element, attrs) {
            var AdminID = authSvc.isAdmin();
            scope.showChk = false;
            scope.reviewonchange = function(booltype) {
                if (booltype === true) {
                    scope.reviewdisplay = scope.dispalyName;
                    commonFactory.open('templates/reviewConfirmationPopup.html', scope, uibModal, 'sm');

                }
            };

            scope.reviewSubmit = function() {
                baseService.menuReviewstatus(scope.custid, '1', scope.sectionid).then(function(response) {
                    if (response.data !== undefined && response.data.length > 0) {
                        if (JSON.parse(response.data[0])[0].STATUS === 1) {
                            commonFactory.closepopup();
                            scope.showChk = false;
                            baseService.menuReviewstatus(scope.custid, '0', '').then(function(response) {
                                model.lnkparentsReview = model.lnksiblingsReview = model.lnkrelativesReview = model.lnkeducationandprofReview = model.lnkpartnerReview = model.lnkastroReview = model.lnkreferenceReview = model.lnkpropertyReview = '';
                                model.menuReviewdata = JSON.parse(response.data);
                                _.each(model.menuReviewdata, function(item) {
                                    var SectionID = item.SectionID;
                                    switch (SectionID) {
                                        case 11:
                                        case 12:
                                        case 13:
                                        case 15:
                                            model.lnkparentsReview = 'red';
                                            break;
                                        case 14:
                                        case 25:
                                        case 26:
                                            model.lnksiblingsReview = 'red';
                                            break;
                                        case 27:
                                        case 28:
                                        case 32:
                                        case 33:
                                            model.lnkrelativesReview = 'red';
                                            break;
                                        case 6:
                                        case 7:
                                        case 8:
                                            model.lnkeducationandprofReview = 'red';
                                            break;
                                        case 16:
                                        case 22:
                                            model.lnkpartnerReview = 'red';
                                            break;
                                        case 23:
                                            model.lnkastroReview = 'red';
                                            break;
                                        case 29:
                                            model.lnkreferenceReview = 'red';
                                            break;
                                        case 34:
                                            model.lnkpropertyReview = 'red';
                                            break;
                                    }
                                });
                            });
                        }
                    }
                });
            };
            scope.cancel = function() {
                commonFactory.closepopup();
            };
            if (AdminID === 1 || AdminID === '1') {

                timeout(function() {
                    scope.showChk = false;
                    var reviewcount = 0;
                    var sectionArr = scope.sectionid.split(',');
                    _.each(sectionArr, function(item) {
                        var isreviewArr = _.where(model.menuReviewdata, { SectionID: parseInt(item) });
                        if (isreviewArr.length > 0) {
                            reviewcount++;
                        }
                    });

                    if (reviewcount > 0) {
                        scope.showChk = true;
                    } else {
                        scope.showChk = false;
                    }

                }, 500);

            }

        }
    }
})();