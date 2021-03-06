angular.module('Kaakateeya').directive("complexGrid", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp', 'authSvc', 'alert', '$filter',

    function(commonpage, timeout, SelectBindServiceApp, authSvc, alertss, filter) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '=',
                pagesizecommunication: '='
            },
            templateUrl: "directives/complex-grid/index.html",
            link: function(scope, element, attrs) {
                var AdminID = authSvc.isAdmin();
                var loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";
                var Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
                scope.init = function() {
                    scope.model.data = [];
                    scope.currentPage = 0;
                    scope.model.pageSize = scope.pagesizecommunication !== undefined && scope.pagesizecommunication !== null && scope.pagesizecommunication !== "" ? 10 : 10;
                    // scope.pagen = 100;
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
                    window.open('/Viewfullprofile/' + row.Profileid + '/0', '_blank');
                };

                scope.sendreceive = function(row) {
                    window.open('/communicationLogs?Profileid=' + row.Profileid, '_blank');
                };
                scope.ViewContact = function(row) {
                    var owner = row.OWNER !== 'Not Assigned' && (row.OWNER).indexOf('(') !== -1 ? (row.OWNER).split('(')[0] : row.OWNER;
                    if (AdminID && parseInt(AdminID) === 1 || Managementid === 'true' || owner === loginempName)
                        window.open('/Contact/' + row.custid, '_blank');
                    else
                        alertss.timeoutoldalerts(scope, 'alert-danger', 'Allowed only for Admin or Management or profleOwners', 4500);
                };
                scope.viewSa = function(row) {
                    var paid = row.Settle === null ? "NO" : "<a style='cursor:pointer;' ng-click='showSAmethod(" + JSON.stringify(row.Settle) + ");' href='javascript:void(0);'>View</a>";
                    return paid;
                };
                scope.ViewHoro = function(row) {
                    var paid = (row.HoroPhotoName).indexOf('Horo_no') !== -1 ? "NO" : "<a  href='javascript:void(0);' ng-click='showHoromethod(" + JSON.stringify(row.HoroPhotoName) + ");'>View</a>";
                    return paid;
                };
                scope.tickethistoryupdate = function(matkteingticket) {
                    scope.marketingTicket = matkteingticket;
                    commonpage.showPopupphotopoup('marketgrid.html', scope, 'md', "modalclassdashboardphotopopup");
                };
                scope.ViewTicket = function(row) {
                    var paid = "<a style='cursor:pointer;' ng-click='tickethistoryupdate(" + row.TicketID + ")'  href='javascript:void(0);'>View</a>";
                    return paid;
                };
                scope.showHoromethod = function(HoroPhotoName) {
                    scope.page.model.image = HoroPhotoName;
                    commonpage.showPopup('templates/bindImagePopup.html', scope, 'md', '');
                };

                scope.showSAmethod = function(Settle) {
                    scope.page.model.image = Settle;
                    commonpage.showPopup('templates/bindImagePopup.html', scope, 'md', '');
                };
                scope.paymentpageredirect = function(row) {
                    if (row.Profileid) {
                        scope.profileid = row.Profileid;
                        commonpage.thirdshowPopup('paymentDetailspopup.html', scope, 'lg', "modelpayment");
                    }
                };
                scope.sendtopayment = function(row) {
                    var pay = row.paidamount === '0/0' ? 'unpaid' : row.paidamount;
                    var paycls = row.paidamount === 'Not Paid' ? 'linkdisabled' : '';
                    var paymant = "<a style='cursor:pointer;' class='" + paycls + "' ng-click='paymentpageredirect(" + JSON.stringify(row) + ")' href='javascript:void(0);'>" + pay + "</a>";
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
                        { text: 'Paid', key: '', type: 'morelinks', templateUrl: scope.sendtopayment },
                        { text: 'Paid Date', key: 'paiddate', type: 'link', method: scope.paymentpageredirect },
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
                        { text: 'Tickets', key: '', type: 'morelinks', templateUrl: scope.ViewTicket },
                        { text: 'Owner', key: 'OWNER', type: 'label' }
                    ];
                    SelectBindServiceApp.playbtnProfileData(data.ProfileID).then(function(response) {
                        data.detaildata = response.data;
                    });
                };
                scope.minus = function(data) {
                    data.isDetail = false;
                };
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
                    var select = 'SELECT ' + join + ' INTO  XLSX("Reports.xlsx",?) FROM ?';
                    alasql(select, [options, array]);
                };
                scope.myprofileexportexcel = function(val) {
                    scope.config.exportexcel(val);
                };
                scope.maintableheight = function(array) {
                    scope.config.maintableheightcommunication(array);
                };
                scope.Reassign = function(obj) {
                    scope.model.Reassign(obj);
                };


                scope.useme = function(searchText) {
                    if (searchText)
                        return filter('filter')(scope.model.ProfileOwnerarray, searchText);
                    else
                        return scope.model.ProfileOwnerarray;
                };

                scope.FilterSerch = function(query) {
                    var results = query ? scope.useme(query) : scope.model.ProfileOwnerarray;
                    return results;

                };
                // scope.querySearch = querySearch;

                // function querySearch(query) {
                //     var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                //         deferred;
                //     if (self.simulateQuery) {
                //         deferred = $q.defer();
                //         $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
                //         return deferred.promise;
                //     } else {
                //         return results;
                //     }
                // }

                scope.loadMore = function() {
                    scope.model.pageSize = scope.model.pageSize + 10;
                };

                scope.model.pageReset = function() {
                    scope.model.pageSize = 10;
                };

                scope.init();
            }
        };
    }
]);
angular.module('Kaakateeya').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input !== undefined ? input.slice(start) : null;
    };
});