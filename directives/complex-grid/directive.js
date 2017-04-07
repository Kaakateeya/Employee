angular.module('Kaakateeya').directive("complexGrid", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp',
    function(commonpage, timeout, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                showplus: '=',
                hidesearch: '=',
                hidepaging: '='
            },
            templateUrl: "directives/complex-grid/index.html",
            link: function(scope, element, attrs) {
                scope.init = function() {
                    scope.model.data = [];
                    scope.currentPage = 0;
                    scope.pageSize = 10;
                    scope.model.exportColumns = {};
                    _.each(scope.model.columns, function(item) {
                        if (item.text !== '')
                            scope.model.exportColumns[item.key] = item.text;
                    });
                    scope.detailView = false;
                };
                scope.$watch(scope.model, function() {
                    scope.init();
                });
                scope.ProfileIdTemplateDUrl = function(row) {
                    return "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>" + row.Profileid + "</a>";
                };
                scope.viewLinks = function(row) {
                    alert(row);
                };
                scope.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.Profileid, '_blank');
                };

                scope.ViewContact = function(row) {
                    // var paid = "<a style='cursor:pointer;'  href='/Contact/" + row.custid + "'>View</a>";
                    // return paid;
                    window.open('/Contact/' + row.custid, '_blank');
                };
                scope.viewSa = function(row) {
                    var paid = "<a style='cursor:pointer;'  href='javascript:void(0);'>View</a>";
                    return paid;
                };
                scope.ViewHoro = function(row) {
                    debugger;
                    var paid = (row.HoroPhotoName).includes('Horo_no.jpg') !== -1 ? "View" : "<a style='cursor:pointer;'  href='javascript:void(0);' >View</a>";
                    return paid;
                };
                scope.ViewTicket = function(row) {
                    var paid = "<a style='cursor:pointer;'  href='/Education/" + row.custid + "'>View</a>";
                    return paid;
                };
                scope.showHoromethod = function(row) {
                    commonpage.showAndBindPopup(row.HoroPhotoName);
                };

                scope.showSAmethod = function(row) {
                    commonpage.showAndBindPopup(row.Settle);
                };

                scope.plus = function(data) {
                    data.isDetail = true;
                    data.detailcolumns = [
                        { text: 'Profile Id', key: 'Profileid', type: 'link', method: scope.ViewProfile },
                        { text: 'Branch-Dor', key: 'RegistrationDate', type: 'label' },
                        { text: 'Paid', key: 'paidamount', type: 'label' },
                        { text: 'Paid Date', key: 'paiddate', type: 'label' },
                        { text: 'S/R', key: 'sentreceivecount', type: 'label' },
                        { text: 'PC', key: 'photocount', type: 'label' },
                        { text: 'PD', key: 'PD', type: 'label' },
                        { text: 'DPD', key: 'DPD', type: 'label' },
                        { text: 'View', key: 'lnkView', type: 'label' },
                        { text: 'NView', key: 'notview', type: 'label', width: '150px' },
                        { text: 'BI', key: 'bothinterst', type: 'label' },
                        { text: 'OppI', key: 'OppI', type: 'label' },
                        { text: 'Contact', key: '', type: 'link', method: scope.ViewContact },
                        { text: 'Sa', key: '', type: 'customlink', templateUrl: scope.viewSa, method: scope.showSAmethod },
                        { text: 'Horo', key: '', type: 'custom', templateUrl: scope.ViewHoro },
                        { text: 'Tickets', key: '', type: 'custom', templateUrl: scope.ViewTicket },
                        { text: 'Owner', key: 'OWNER', type: 'label' },
                    ]

                    SelectBindServiceApp.playbtnProfileData(data.ProfileID).then(function(response) {
                        data.detaildata = response.data;
                        console.log(data.detaildata);
                    });
                };
                scope.minus = function(data) {
                    data.isDetail = false;

                }
                scope.sort = function(keyname) {
                    scope.sortKey = keyname; //set the sortKey to the param passed
                    scope.reverse = !scope.reverse; //if true make it false and vice versa
                }


                scope.init();
            }
        };
    }
]);
angular.module('Kaakateeya').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});