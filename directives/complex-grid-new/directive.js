angular.module('Kaakateeya').directive("complexGridNew", ['modelpopupopenmethod', '$timeout', 'SelectBindServiceApp', 'authSvc', 'alert', '$filter',
    function(commonpage, timeout, SelectBindServiceApp, authSvc, alertss, filter) {
        return {
            restrict: "E",
            scope: {
                model: '=',
                config: '=',
                pagesizecommunication: '=',
                gid: '='
            },
            templateUrl: "directives/complex-grid-new/index.html",
            link: function(scope, element, attrs) {
                // scope.gid = 'g1';

                var AdminID = authSvc.isAdmin();
                var loginempName = authSvc.LoginEmpName();
                var Managementid = authSvc.isManagement();
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
                // scope.$watch(scope.model, function() {
                //     scope.init();
                // });


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
                scope.paymentpageredirect = function(profileid) {
                    window.open("EmployeePayments/0" + "?idsss=" + profileid, "_blank");
                };
                scope.sendtopayment = function(row) {
                    var pay = row.paidamount === '0/0' ? 'unpaid' : row.paidamount;
                    var paymant = "<a style='cursor:pointer;' ng-click='paymentpageredirect(" + JSON.stringify(row.Profileid) + ")' href='javascript:void(0);'>" + pay + "</a>";
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

                $('#dynamic .pane-hScroll').scroll(function() {
                    $('#dynamic .pane-vScroll').width($('#dynamic .pane-hScroll').width() + $('#dynamic .pane-hScroll').scrollLeft());
                });
                $('#id1 .pane-hScroll').scroll(function() {
                    $('#id1 .pane-vScroll').width($('#id1 .pane-hScroll').width() + $('#id1 .pane-hScroll').scrollLeft());
                });

                $('#id2 .pane-hScroll').scroll(function() {
                    $('#id2 .pane-vScroll').width($('#id2 .pane-hScroll').width() + $('#id2 .pane-hScroll').scrollLeft());
                });

                $('#id3 .pane-hScroll').scroll(function() {
                    $('#id3 .pane-vScroll').width($('#id3 .pane-hScroll').width() + $('#id3 .pane-hScroll').scrollLeft());
                });

                $('#id4 .pane-hScroll').scroll(function() {
                    $('#id4 .pane-vScroll').width($('#id4 .pane-hScroll').width() + $('#id4 .pane-hScroll').scrollLeft());
                });
                $('#id5 .pane-hScroll').scroll(function() {
                    $('#id5 .pane-vScroll').width($('#id5 .pane-hScroll').width() + $('#id5 .pane-hScroll').scrollLeft());
                });

                $('#id6 .pane-hScroll').scroll(function() {
                    $('#id6 .pane-vScroll').width($('#id6 .pane-hScroll').width() + $('#id6 .pane-hScroll').scrollLeft());
                });

                timeout(function() {
                    // $('#' + scope.gid + '.pane-hScroll').scroll(function() {
                    //     $('#' + scope.gid + '.pane-vScroll').width($('#' + scope.gid + '.pane-hScroll').width() + $('#' + scope.gid + ' .pane-hScroll').scrollLeft());
                    // });

                    $('#dynamic .pane-hScroll').scroll(function() {
                        $('#dynamic .pane-vScroll').width($('#dynamic .pane-hScroll').width() + $('#dynamic .pane-hScroll').scrollLeft());
                    });
                    $('#id1 .pane-hScroll').scroll(function() {
                        $('#id1 .pane-vScroll').width($('#id1 .pane-hScroll').width() + $('#id1 .pane-hScroll').scrollLeft());
                    });

                    $('#id2 .pane-hScroll').scroll(function() {
                        $('#id2 .pane-vScroll').width($('#id2 .pane-hScroll').width() + $('#id2 .pane-hScroll').scrollLeft());
                    });

                    $('#id3 .pane-hScroll').scroll(function() {
                        $('#id3 .pane-vScroll').width($('#id3 .pane-hScroll').width() + $('#id3 .pane-hScroll').scrollLeft());
                    });

                    $('#id4 .pane-hScroll').scroll(function() {
                        $('#id4 .pane-vScroll').width($('#id4 .pane-hScroll').width() + $('#id4 .pane-hScroll').scrollLeft());
                    });
                    $('#id5 .pane-hScroll').scroll(function() {
                        $('#id5 .pane-vScroll').width($('#id5 .pane-hScroll').width() + $('#id5 .pane-hScroll').scrollLeft());
                    });

                    $('#id6 .pane-hScroll').scroll(function() {
                        $('#id6 .pane-vScroll').width($('#id6 .pane-hScroll').width() + $('#id6 .pane-hScroll').scrollLeft());
                    });
                }, 2000);
                scope.init();
                scope.loadMore = function() {
                    scope.model.pageSize = scope.model.pageSize + 10;
                };
                scope.model.pageReset = function() {
                    scope.model.pageSize = 10;
                };

                scope.scrolltotop = function() {
                    scope.model.pageSize = 10;
                    $(".pane-vScroll").animate({
                        scrollTop: 0
                    }, 600);
                    $('#dynamic .vScroll').animate({
                        scrollTop: 0
                    }, 600);
                    $('#id1 .vScroll').animate({
                        scrollTop: 0
                    }, 600);

                    $('#id2 .vScroll').animate({
                        scrollTop: 0
                    }, 600);

                    $('#id3 .vScroll').animate({
                        scrollTop: 0
                    }, 600);

                    $('#id4 .vScroll').animate({
                        scrollTop: 0
                    }, 600);
                    $('#id5 .vScroll').animate({
                        scrollTop: 0
                    }, 600);

                    $('#id6 .vScroll').animate({
                        scrollTop: 0
                    }, 600);

                };

            }

        };
    }
]);


angular.module('Kaakateeya').filter('startFrom', function() {
    return function(input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
    };
});