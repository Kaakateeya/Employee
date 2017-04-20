angular.module('Kaakateeya').directive("complexGrid", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp',
    function(commonpage, timeout, SelectBindServiceApp) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '='
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
                scope.page = {};
                scope.page.model = {};
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
                scope.sendreceive = function(row) {
                    return "<a style='cursor:pointer;'  href='javascript:void(0);'>" + row.sentreceivecount + "</a>";
                };
                scope.ViewContact = function(row) {
                    // var paid = "<a style='cursor:pointer;'  href='/Contact/" + row.custid + "'>View</a>";
                    // return paid;
                    window.open('/Contact/' + row.custid, '_blank');
                };
                scope.viewSa = function(row) {
                    var paid = row.Settle === null ? "view" : "<a style='cursor:pointer;' ng-click='showSAmethod(" + JSON.stringify(row.Settle) + ");' href='javascript:void(0);'>View</a>";
                    return paid;
                };
                scope.ViewHoro = function(row) {
                    var paid = (row.HoroPhotoName).indexOf('Horo_no') !== -1 ? "View" : "<a  href='javascript:void(0);' ng-click='showHoromethod(" + JSON.stringify(row.HoroPhotoName) + ");'>View</a>";
                    return paid;
                };
                scope.ViewTicket = function(row) {
                    var paid = "<a style='cursor:pointer;'  href='/Education/" + row.custid + "'>View</a>";
                    return paid;
                };
                scope.showHoromethod = function(HoroPhotoName) {
                    // commonpage.showPopup(row.HoroPhotoName);
                    scope.page.model.image = HoroPhotoName;
                    commonpage.showPopup('templates/bindImagePopup.html', scope, 'md', '');
                };

                scope.showSAmethod = function(Settle) {
                    // commonpage.showAndBindPopup(Settle);
                    scope.page.model.image = Settle;
                    commonpage.showPopup('templates/bindImagePopup.html', scope, 'md', '');
                };
                scope.sendtopayment = function(row) {
                    var pay = row.paidamount === '0/0' ? 'unpaid' : row.paidamount;
                    var paymant = "<a style='cursor:pointer;' href='javascript:void(0);'>" + pay + "</a>";
                    return paymant;
                };
                scope.page.model.close = function() {
                    commonpage.closepopup();
                };
                scope.plus = function(data) {
                    data.isDetail = true;
                    data.detailcolumns = [
                        { text: 'Profile Id', key: 'Profileid', type: 'link', method: scope.ViewProfile },
                        { text: 'Branch-Dor', key: 'RegistrationDate', type: 'label' },
                        { text: 'Paid', key: '', type: 'custom', templateUrl: scope.sendtopayment },
                        { text: 'Paid Date', key: 'paiddate', type: 'label' },
                        { text: 'S/R', key: 'sentreceivecount', type: 'link', method: scope.sendreceive },
                        { text: 'PC', key: 'photocount', type: 'label' },
                        { text: 'PD', key: 'PD', type: 'label' },
                        { text: 'DPD', key: 'DPD', type: 'label' },
                        { text: 'View', key: 'lnkView', type: 'label' },
                        { text: 'NView', key: 'notview', type: 'label', width: '150px' },
                        { text: 'BI', key: 'bothinterst', type: 'label' },
                        { text: 'OppI', key: 'OppI', type: 'label' },
                        { text: 'Contact', key: '', type: 'link', method: scope.ViewContact },
                        { text: 'Sa', key: '', type: 'morelinks', templateUrl: scope.viewSa },
                        { text: 'Horo', key: '', type: 'morelinks', templateUrl: scope.ViewHoro },
                        { text: 'Tickets', key: '', type: 'custom', templateUrl: scope.ViewTicket },
                        { text: 'Owner', key: 'OWNER', type: 'label' },
                    ];
                    SelectBindServiceApp.playbtnProfileData(data.ProfileID).then(function(response) {
                        data.detaildata = response.data;
                    });
                };
                scope.minus = function(data) {
                    data.isDetail = false;
                }
                scope.sort = function(keyname) {
                    scope.sortKey = keyname; //set the sortKey to the param passed
                    scope.reverse = !scope.reverse; //if true make it false and vice versa
                };
                scope.exportexcel = function(array, columns) {
                    var cloumsarr = [];
                    var selectarray = [];
                    _.each(_.filter(columns, function(item) { return item.key !== "" && item.key !== undefined; }), function(inneritem) {
                        cloumsarr.push({ columnid: inneritem.key, title: inneritem.text });
                    });
                    var options = {
                        headers: true,
                        columns: cloumsarr
                    };
                    var join = _.map(cloumsarr, 'columnid').join(',');
                    var select = 'SELECT ' + join + ' INTO  XLSX("john.xlsx",?) FROM ?';
                    alasql(select, [options, array]);
                };

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