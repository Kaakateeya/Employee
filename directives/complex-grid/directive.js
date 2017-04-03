angular.module('Kaakateeya').directive("complexGrid", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp',
    function(commonpage, timeout, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                showplus: '='
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
                    scope.detailView = false
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
                    var paid = "<a style='cursor:pointer;'   href='/Viewfullprofile/" + row.Profileid + "'>" + row.Profileid + "</a>";
                    return paid;
                };

                scope.ViewContact = function(value, row, index) {
                    var paid = "<a style='cursor:pointer;'  href='/Contact/" + row.CustID + "'>View Conatact</a>";
                    return paid;
                };
                scope.viewSa = function(value, row, index) {
                    var paid = "<a style='cursor:pointer;'  href='javascript:void(0);' onclick='showAndBindPopup('" + row.Settle + "');'>View</a>";
                    return paid;
                };
                scope.ViewHoro = function(value, row, index) {
                    var paid = row.HoroPhotoName.indexOf('Horo_no.jpg') !== -1 ? "View" : "<a style='cursor:pointer;'  href='javascript:void(0);' onclick='showAndBindPopup(" + JSON.stringify(row.HoroPhotoName) + ");'>View</a>";
                    return paid;
                };
                scope.ViewTicket = function(value, row, index) {
                    var paid = "<a style='cursor:pointer;'  href='/Education/" + row.CustID + "'>View</a>";
                    return paid;
                };



                scope.plus = function(data) {
                    data.isDetail = true;
                    data.detailcolumns = [
                        { text: 'ProfileID', key: 'Profileid', type: 'custom', templateUrl: scope.ViewProfile },
                        { text: 'Branch-Dor', key: 'RegistrationDate', type: 'label' },
                        { text: 'OP/KP', key: 'paidamount', type: 'label' },
                        { text: 'OPD/KPD', key: 'paiddate', type: 'label' },
                        { text: 'S/R Count', key: 'sentreceivecount', type: 'label' },
                        { text: 'PC', key: 'photocount', type: 'label' },
                        { text: 'PD', key: 'PD', type: 'label' },
                        { text: 'DPD', key: 'DPD', type: 'label' },
                        { text: 'View', key: 'lnkView', type: 'label' },
                        { text: 'NView', key: 'notview', type: 'label', width: '150px' },
                        { text: 'BI', key: 'bothinterst', type: 'label' },
                        { text: 'OppI', key: 'OppI', type: 'label' },
                        { text: 'View Contact', key: '', type: 'link', method: scope.viewLinks },
                        { text: 'SA', key: '', type: 'link', method: scope.viewLinks },
                        { text: 'Horo', key: '', type: 'link', method: scope.viewLinks },
                        { text: 'Tickets', key: '', type: 'link', method: scope.viewLinks },
                        { text: 'Profile Owner', key: 'OWNER', type: 'label' },
                    ]

                    SelectBindServiceApp.playbtnProfileData(data.ProfileID).then(function(response) {
                        data.detaildata = JSON.parse(response.data[0]);
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