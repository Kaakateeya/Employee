(function(angular) {
    'use strict';

    function factory($http, dashboardServices, uibModal, authSvc, helperservice, window, commonpage, $filter, fileUpload) {
        var model = {};
        var flag = 0;
        model.frompage = 6;
        model.topage = 10;
        model.tablenameflag = "";
        model.proceedprofileid = "";
        model.exportData = function(id) {
            var options = {
                headers: true,
                columns: [{
                        columnid: 'Sno',
                        title: 'Sno'
                    }, {
                        columnid: 'Profileid',
                        title: 'Profileid'
                    }, {
                        columnid: 'Name',
                        title: 'Name'
                    },
                    {
                        columnid: 'Date',
                        title: 'Date'
                    }
                ]
            };
            alasql('SELECT Sno,Profileid,Name,Date INTO  XLSX("john.xlsx",?) FROM ?', [options, model.exportDataarray]);
            // alasql('SELECT * INTO  XLSX("john.xlsx",{headers:true}) FROM ?', [model.exportDataarray]);
        };
        model.tabledata = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                    console.log(response);
                    if (type === 'pageload') {
                        model.landingItems = response.data;
                    } else if (type === 'load') {
                        _.each(response.data[0], function(inneritem) {
                            array.push(inneritem);
                        });
                    } else if (type === 'export') {
                        model.exportDataarray = [];
                        model.exportDataarray = response.data[0];
                        model.exportData('exportableproceeding');
                    } else {
                        if (frompage === 1) {
                            model.slidearray = response.data[0];
                        } else {
                            _.each(response.data, function(inneritem) {
                                model.slidearray.push(inneritem);
                            });
                        }
                    }
                }
            });
        };
        model.loadmore = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            switch (type) {
                case "export":
                    model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
                    break;
                case "load":
                    if (model.tablenameflag !== tablename) {
                        model.tablenameflag = tablename;
                        model.frompage = 6;
                        model.topage = 10;
                    } else {
                        model.frompage = topage + 1;
                        model.topage = topage + 5;
                    }
                    model.tabledata(empid, branchcode, model.frompage, model.topage, tablename, type, array, slideflag);
                    break;
            }
        };

        model.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
            model.slideshowtrue = flag;
            if (flag === true) {
                model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
            }
        };
        model.init = function() {
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
            if (model.empid !== null && model.empid !== "" && model.empBranchID !== null && model.empBranchID !== "") {
                model.tabledata(model.empid, model.empBranchID, 1, 5, '', 'pageload', undefined, 0);
            }
        };

        model.viewfullprofile = function(profileid) {
            window.open("Viewfullprofile/" + profileid, "_blank");
        };

        model.closeupload = function() {
            commonpage.closepopuppoptopopup();
        };

        model.upload = function(obj) {
            //obj.myFile.name
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
                    console.log(obj.myFile);
                    var keyname = app.prefixPath + model.proceedprofileid + '_settlementImages' + '/' + model.proceedprofileid + '_settlementImages.' + extension;
                    fileUpload.uploadFileToUrl(obj.myFile, '/settlementformupload', keyname).then(function(res) {
                        console.log(res.status);
                        if (res.status == 200) {
                            model.closeupload();
                            var today = $filter('date')(new Date(), 'dd/MM/yyyy hh:mm:ss a');
                            var object = {
                                CreatedByEmpID: model.empid,
                                CreatedDate: today,
                                ModifiedByEmpID: model.empid,
                                ModifiedEmpDate: today,
                                SettlementAgreedAmount: 0,
                                Notes: "",
                                isActive: 0,
                                Settlementfrompath: '~/Images/SettlementImages/' + model.proceedprofileid + '_settlementImages/' + model.proceedprofileid + '_settlementImages.' + extension,
                                isassigned: 0,
                                ReferenceID: 0,
                                Profileidnew: model.proceedprofileid
                            };
                            dashboardServices.uploadsettlementform(object).then(function(response) {
                                console.log(response);

                            });
                        }
                    });
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        };

        model.notificationread = function(notificationid, index, parentid, custid, CategoryID) {
            var obj = {
                EmpID: model.empid,
                idisplay: 2,
                NotificationID: notificationid,
                CategoryID: CategoryID,
                CustID: custid
            };
            dashboardServices.readNotifications(obj).then(function(response) {
                console.log(response);
            });
            ((model.landingItems)[parentid]).splice(index, 1);
        };

        model.bouncedemail = function(obj) {
            var object = {
                CustID: model.Custidbounce,
                EmailBounceEntryId: model.entryid,
                BounceMailid: obj.newemail
            };
            dashboardServices.getUpdateEmailBounce(object).then(function(response) {
                console.log("email");
                console.log(response);
            });
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', factory);
    factory.$inject = ['$http', 'dashboardServices', '$uibModal', 'authSvc', 'helperservice', '$window', 'modelpopupopenmethod', '$filter', 'fileUpload'];
})(angular);