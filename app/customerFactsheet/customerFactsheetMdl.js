(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('customerFactsheetModel', ['customerFactsheetService', 'complex-grid-config', 'alert', 'modelpopupopenmethod',
            function(customerFactsheetService, configgrid, alerts, modelpopupopenmethod) {
                var model = {};
                model.gridtable1 = {};
                model.gridtable2 = {};
                model.gridtable3 = {};
                model.gridtable4 = {};
                model.gridtable5 = {};
                model.gridtable6 = {};
                model.gridtable7 = {};
                model.gridtable8 = {};
                model.showsearchrows = true;
                model.showsearch = true;
                model.showpaging = false;
                model.showClientpaging = true;
                model.myprofileexcel = false;
                model.normalexcel = false;
                model.gridTableshow = false;
                model.receivedprofiles = 1;
                model.sentprofile = 1;
                model.gridtable1.type = 'grid1';
                model.gridtable2.type = 'grid2';
                model.gridtable3.type = 'grid3';
                model.gridtable4.type = 'grid4';
                model.gridtable5.type = 'grid5';
                model.gridtable6.type = 'grid6';
                model.gridtable7.type = 'grid7';
                model.gridtable8.type = 'grid8';
                model.showplus = false;
                model.sendexpressinterestservice = function(row) {

                    // var obj = {
                    //     EncriptedText: null,
                    //     EncriptedTextrvr: null,
                    //     EncryptedRejectFlagText: null,
                    //     EncryptedRejectFlagTextrvr: null,
                    //     FromProfileID: model.gridtable8.data[0].ProfileId,
                    //     IFromCustID: model.gridtable8.data[0].fromcustid,
                    //     IToCustID: row.Cust_ID,
                    //     Logid: null,
                    //     MessageHistoryId: null,
                    //     MessageLinkId: null,
                    //     StrHtmlText: null,
                    //     ToProfileID: row.ProfileID,
                    //     TypeofInsert: "E"
                    // };
                    // customerFactsheetService.sendexpressinterest(obj).then(function(response) {
                    //     if (response.data && parseInt(response.data) == 1) {
                    //         alerts.timeoutoldalerts(model.scope, 'alert-success', 'EXpressInterest done SuccessFully', 3000);
                    //     } else {
                    //         alerts.timeoutoldalerts(model.scope, 'alert-danger', 'EXpressInterest Fail', 3000);
                    //     }
                    // });
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Comming Soon Feature', 4000);
                };
                model.sendservicemailprofile = function(row) {
                    var dd = "";
                    dd = "<a href='javascript:void(0)' ng-click='model.sendexpressinterestservice(" + row.Cust_ID + "," + row.ProfileID + ")'>Send service</a>";
                    return dd;
                };
                model.paymentstatus = function(row) {

                    var dd = "";
                    var payment = row.Payment === 1 || row.Payment === '1' ? 'Paid' : 'Unpaid';
                    dd = "<p>" + payment + "</p>";
                    return dd;
                };
                model.displaystatus = function(row) {
                    var dd = "";
                    dd = "<p>" + row.display === 0 || row.display === "0" ? 'False' : 'True' + "</p>";
                    return dd;
                };
                model.dispalylogindate = function(row) {
                    var dd = "";
                    dd = "<p>" + row.LastLoginDate + "(" + row.LoginCount + ")" + "</p>";
                    return dd;
                };
                model.displaybranchname = function(row) {
                    var dd = "";
                    dd = "<p>" + row.BranchesName + "-(" + row.RegistrationDate + ")" + "</p>";
                    return dd;
                };
                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.PaidStatus === 1 ? 'paidclass' : 'unpaid';
                    var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                    return paid;
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
                };
                model.displayuploadedbyemployee = function(row) {
                    var dd = "";
                    dd = "<p>" + row.uploadedby !== undefined && row.uploadedby !== null && $.trim(row.uploadedby) !== '' ? row.uploadedby : 'Customer' + "</p>";
                    return dd;
                };
                model.factsheetdetails = function(from, to, type) {
                    model.gridtable1.data = undefined;
                    model.gridtable2.data = undefined;
                    model.gridtable3.data = undefined;
                    model.gridtable4.data = undefined;
                    model.gridtable5.data = undefined;
                    model.gridtable6.data = undefined;
                    model.gridtable7.data = undefined;
                    model.gridtable8.data = undefined;
                    model.sendarray1 = [];
                    model.sendarray2 = [];
                    model.sendarray3 = [];
                    model.sendarray4 = [];
                    model.sendarray5 = [];
                    model.sendarray6 = [];
                    model.sendarray7 = [];
                    model.sendarray8 = [];
                    model.gridtable1.mainArray = [];
                    model.gridtable2.mainArray = [];
                    model.gridtable3.mainArray = [];
                    model.gridtable4.mainArray = [];
                    model.gridtable5.mainArray = [];
                    model.gridtable6.mainArray = [];
                    model.gridtable7.mainArray = [];
                    model.gridtable8.mainArray = [];
                    model.gridtable1.columns = [
                        { text: 'Photoname', key: 'Photoname', type: 'label' },
                        { text: 'uploadedBy', key: 'uploadempname', type: 'morelinks', templateUrl: model.displayuploadedbyemployee },
                        { text: 'uploadedDate', key: 'uploadedDate', type: 'label' },
                        { text: 'ModifiedDate', key: 'ModifiedDate', type: 'label' },
                        { text: 'ModifiedByEmp', key: 'ModifiedByEmpID', type: 'label' }
                    ];
                    model.gridtable2.columns = [
                        { text: 'HoroscopeImageName', key: 'HoroscopeImageName', type: 'label' },
                        { text: 'uploadedBy', key: 'uploadedby', type: 'label', },
                        { text: 'uploadedDate', key: 'UploadDate', type: 'label' },
                        { text: 'ModifiedBY', key: 'ModifiedBY', type: 'label' },
                        { text: 'ModifiedDate', key: 'ModifiedDate', type: 'label' }
                    ];
                    model.gridtable3.columns = [
                        { text: 'Br-Dor', key: 'RegistrationDate', type: 'morelinks', templateUrl: model.displaybranchname },
                        { text: 'ProfileStatus', key: 'ProfileStatusID', type: 'label' },
                        { text: 'LastLoginDate', key: 'LastLoginDate', type: 'morelinks', templateUrl: model.dispalylogindate }
                    ];
                    model.gridtable4.columns = [
                        { text: 'Payment', key: 'Payment', type: 'morelinks', templateUrl: model.paymentstatus },
                        { text: 'Allowed Points', key: 'allowed', type: 'label' },
                        { text: 'Used Points', key: 'usedcount', type: 'label' },
                        { text: 'Expiry Date', key: 'expirydate', type: 'label' }

                    ];

                    model.gridtable6.columns = [
                        { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        { text: 'Name', key: 'NAME', type: 'label' },
                        { text: 'CreatedDate', key: 'CreatedDate', type: 'label' },
                        { text: 'Service', key: 'CreatedDate', type: 'customlink', templateUrl: model.sendservicemailprofile, method: model.sendexpressinterestservice }

                    ];
                    model.gridtable7.columns = [
                        { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        { text: 'Name', key: 'NAME', type: 'label' },
                        { text: 'CreatedDate', key: 'CreatedDate', type: 'label' },
                        { text: 'Service', key: 'CreatedDate', type: 'customlink', templateUrl: model.sendservicemailprofile, method: model.sendexpressinterestservice }
                    ];
                    customerFactsheetService.getVerifyProfileid(model.txtprofileidfactsheet).then(function(respo) {
                        if (respo.data && parseInt(respo.data) === 1) {
                            customerFactsheetService.CustomerFactsheetDetails(model.txtprofileidfactsheet).then(function(response) {
                                console.log(response);
                                if ((response.data[0]).length !== 0 || (response.data[1]).length !== 0 || (response.data[2]).length !== 0 || (response.data[3]).length !== 0 ||
                                    (response.data[4]).length !== 0 || (response.data[5]).length !== 0 || (response.data[6]).length !== 0 || (response.data[7]).length !== 0) {
                                    model.sendarray1 = response.data[0];
                                    model.sendarray2 = response.data[1];
                                    model.sendarray3 = response.data[2];
                                    model.sendarray4 = response.data[4];
                                    model.sendarray5 = response.data[3];
                                    model.sendarray6 = response.data[5];
                                    model.sendarray7 = response.data[6];
                                    model.sendarray8 = response.data[7];
                                    //1
                                    model.gridtable1.mainArray = model.sendarray1.length > 0 ? (model.sendarray1) : [{ Photoname: "No Data Found", uploadempname: 'No Data Found', uploadedDate: 'No Data Found', ModifiedDate: 'No Data Foound', ModifiedByEmpID: 'No Data Found' }];
                                    model.gridtable1.data = model.gridtable1.mainArray;
                                    model.gridTableshow = true;
                                    //2
                                    model.gridtable2.mainArray = model.sendarray2.length > 0 ? (model.sendarray2) : [{ HoroscopeImageName: "No Data Found", uploadedby: 'No Data Found', UploadDate: 'No Data Found', ModifiedBY: 'No Data Found', ModifiedDate: 'No Data Found' }];
                                    model.gridtable2.data = model.gridtable2.mainArray;
                                    //3
                                    model.gridtable3.mainArray = model.sendarray3.length > 0 ? (model.sendarray3) : [{ RegistrationDate: 'No Data Found', ProfileStatusID: 'No data Found', LastLoginDate: 'No data Found' }];
                                    model.gridtable3.data = model.gridtable3.mainArray;
                                    //4
                                    model.gridtable4.mainArray = model.sendarray4.length > 0 ? (model.sendarray4) : [{ Payment: 'No Data Found', allowed: 'No data Found', usedcount: 'No data Found', expirydate: 'No data Found' }];
                                    model.gridtable4.data = model.gridtable4.mainArray;

                                    //5
                                    model.gridtable5.mainArray = model.sendarray5.length > 0 ? (model.sendarray5) : ["1"];
                                    model.gridtable5.data = model.gridtable5.mainArray;
                                    //6
                                    model.gridtable6.mainArray = model.sendarray6.length > 0 ? (model.sendarray6) : [{ ProfileID: 'No Data Found', NAME: 'No data Found', CreatedDate: 'No data Found' }];
                                    model.gridtable6.data = model.gridtable6.mainArray;
                                    //7
                                    model.gridtable7.mainArray = model.sendarray7.length > 0 ? (model.sendarray7) : [{ ProfileID: 'No Data Found', NAME: 'No data Found', CreatedDate: 'No data Found' }];
                                    model.gridtable7.data = model.gridtable7.mainArray;
                                    //8
                                    model.gridtable8.mainArray = model.sendarray8.length > 0 ? (model.sendarray8) : ["1"];
                                    model.gridtable8.data = model.gridtable8.mainArray;
                                }

                            });
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID does not exists', 30000);
                        }
                    });
                };

                model.sendenailviewprofile = function() {
                    customerFactsheetService.custmorfactsheetsendMail(model.txtprofileidfactsheet).then(function(respo) {
                        if (respo.data && parseInt(respo.data) === 1) {
                            customerFactsheetService.sendEmail_factResetPassword(model.txtprofileidfactsheet).then(function(response) {
                                console.log(response);
                                if (response.data && parseInt(response.data) === 1) {
                                    model.alertsendemailtext = 'ViewProfile details sent your Mail successfully';
                                    modelpopupopenmethod.showPopup('alertfactsheer.html', model.scope, 'md', '');
                                    // alerts.timeoutoldalerts(model.scope, 'alert-success', 'ViewProfile details sent your Mail successfully', 3000);
                                } else {
                                    model.alertsendemailtext = 'ViewProfile details sent your Mail fail';
                                    modelpopupopenmethod.showPopup('alertfactsheer.html', model.scope, 'md', '');
                                    //   alerts.timeoutoldalerts(model.scope, 'alert-danger', 'ViewProfile details sent your Mail fail', 3000);
                                }
                            });
                            customerFactsheetService.getsendEmail_ResetPassword(model.txtprofileidfactsheet).then(function(response1) {
                                console.log(response1);
                            });
                        } else {
                            model.alertsendemailtext = 'ProfileID not Reviewed';
                            modelpopupopenmethod.showPopup('alertfactsheer.html', model.scope, 'md', '');
                            //  alerts.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID not Reviewed', 3000);
                        }
                    });
                };
                model.sendforgetpassword = function() {
                    customerFactsheetService.getsendEmail_ResetPassword(model.txtprofileidfactsheet).then(function(response) {
                        console.log(response);
                        model.alertsendemailtext = 'EmailId send to the user MailID.';
                        modelpopupopenmethod.showPopup('alertfactsheer.html', model.scope, 'md', '');
                        //alerts.timeoutoldalerts(model.scope, 'alert-success', 'EmailId send to the user MailID.', 3000);
                    });
                };
                model.resetfactsheet = function() {
                    model.txtprofileidfactsheet = "";
                    model.gridtable1.data = undefined;
                    model.gridtable2.data = undefined;
                    model.gridtable3.data = undefined;
                    model.gridtable4.data = undefined;
                    model.gridtable5.data = undefined;
                    model.gridtable6.data = undefined;
                    model.gridtable7.data = undefined;
                    model.gridtable8.data = undefined;
                    model.sendarray1 = [];
                    model.sendarray2 = [];
                    model.sendarray3 = [];
                    model.sendarray4 = [];
                    model.sendarray5 = [];
                    model.sendarray6 = [];
                    model.sendarray7 = [];
                    model.sendarray8 = [];
                    model.gridtable1.mainArray = [];
                    model.gridtable2.mainArray = [];
                    model.gridtable3.mainArray = [];
                    model.gridtable4.mainArray = [];
                    model.gridtable5.mainArray = [];
                    model.gridtable6.mainArray = [];
                    model.gridtable7.mainArray = [];
                    model.gridtable8.mainArray = [];
                    model.gridTableshow = false;
                };
                model.closepopup = function() {
                    modelpopupopenmethod.closepopup();
                };

                return model;
            }
        ]);
})();