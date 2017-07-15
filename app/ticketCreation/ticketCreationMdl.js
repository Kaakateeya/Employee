(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('ticketCreationModel', ['ticketCreationService', 'authSvc', 'alert', 'modelpopupopenmethod',
            function(ticketCreationService, authSvc, alerts, modelpopupopenmethod) {
                var model = {};
                model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
                model.onchangeofcreateticket = function(type) {
                    if (model.ticketpopupflag === 1) {
                        modelpopupopenmethod.closepopuppoptopopup();
                        model.ticketpopupflag = 0;
                    }
                    model.personalname = false;
                    var obj;
                    if (type === 'profileid') {
                        obj = {
                            EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                            ProfileID: model.txtProfileidticket,
                            MobileNumber: null,
                            Email: null
                        };
                    } else if (type === "email") {
                        obj = {
                            EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                            ProfileID: null,
                            //MobileNumber: model.txtphonenumber !== "" ? model.txtphonenumber : null,
                            MobileNumber: null,
                            Email: model.txtcustomermail !== "" ? model.txtcustomermail : null,
                        };
                    } else {
                        obj = {
                            EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                            ProfileID: null,
                            MobileNumber: model.txtphonenumber !== "" ? model.txtphonenumber : null,
                            // Email: model.txtcustomermail !== "" ? model.txtcustomermail : null,
                            Email: null,
                        };
                    }
                    ticketCreationService.getticketinformation(obj).then(function(response) {
                        console.log(response.data);
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                            response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.ticketinforamationarray = [];
                            model.ticketinforamationarray = response.data[0];
                            model.objcustomerprofileid = response.data[0][0].ProfileID;
                            model.objProfileStatusID = response.data[0][0].ProfileStatusID;
                            model.objCustID = response.data[0][0].CustID;
                            model.objProfileOwner = response.data[0][0].MarketingOwner !== null ? response.data[0][0].MarketingOwner : 'Not Assigned';
                            model.objcustomername = response.data[0][0].CustomerName;
                            model.objphonenumber = response.data[0][0].MobileNumber;
                            model.objcountrycode = response.data[0][0].MobileCode;
                            model.objTicketID = response.data[0][0].TicketID;
                            model.objMarketTicketID = response.data[0][0].MarketTicketID;
                            model.objcustomermail = response.data[0][0].Email;
                            if (type === 'profileid') {
                                if (model.objMarketTicketID === null) {
                                    model.personalname = true;
                                    //ticket information show here
                                } else if (model.objMarketTicketID !== null) {
                                    //show popup here
                                    model.personalname = false;
                                    model.ticketpopupflag = 1;
                                    model.txtProfileidticket = "";
                                    modelpopupopenmethod.showPopupphotopoup('tiketinforamtion.html', model.scope, 'md', "modalclassdashboardphotopopup123");
                                } else {
                                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profileid Does Not Exist', 4000);
                                }
                            } else {
                                if (model.objMarketTicketID === null) {
                                    //ticket information show here
                                } else if (model.objMarketTicketID !== null) {
                                    //show popup here
                                    if (type === "email") {
                                        model.txtcustomermail = "";
                                    } else {
                                        model.txtphonenumber = "";
                                        model.countrycode = "1";
                                    }
                                    modelpopupopenmethod.showPopupphotopoup('tiketinforamtion.html', model.scope, 'md', "modalclassdashboardphotopopup123");

                                } else {}
                            }
                        } else {
                            if (type === 'profileid') {
                                if ($.trim(model.txtProfileidticket) !== "" && model.txtProfileidticket !== null && model.txtProfileidticket !== undefined) {
                                    model.txtProfileidticket = "";
                                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profileid Does Not Exist', 4000);
                                }
                            }
                        }
                    });
                };
                model.close = function(type) {
                    modelpopupopenmethod.closepopuppoptopopup();
                    // model.clearallcontrols();
                };
                model.clearallcontrols = function() {
                    model.txtProfileidticket = "";
                    model.countrycode = "1";
                    model.txtphonenumber = "";
                    model.txtcustomername = "";
                    model.txtcustomermail = "";
                    model.txtMessage = "";
                    model.ticketinforamationarray = [];
                    model.objcustomerprofileid = "";
                    model.objProfileStatusID = "";
                    model.objCustID = "";
                    model.objProfileOwner = "";
                    model.objcustomername = "";
                    model.objphonenumber = "";
                    model.objcountrycode = "";
                    model.objTicketID = "";
                    model.objMarketTicketID = "";
                    model.objcustomermail = "";
                };
                model.ticketpopup = function() {
                    model.close();
                    modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");

                };
                model.ticketcreationsubmit = function() {
                    var obj;
                    if (model.rbtntype === '2') {
                        obj = {
                            profile: null,
                            AssignedEmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                            BranchID: 0,
                            Name: model.txtcustomername !== "" ? model.txtcustomername : null,
                            Email: model.txtcustomermail !== "" ? model.txtcustomermail : null,
                            subject: "Marketing",
                            Category: 462,
                            Message: model.txtMessage !== "" ? model.txtMessage : null,
                            Priority: 70,
                            Image: null,
                            CountryCode: model.countrycode !== "" && model.countrycode !== '0' && model.countrycode !== 0 ? model.countrycode : null,
                            AreaCode: null,
                            PhoneNum: model.txtphonenumber !== "" && model.txtphonenumber !== null && model.txtphonenumber !== undefined ? model.txtphonenumber : "",
                            EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : ""
                        };
                    } else {
                        obj = {
                            profile: model.txtProfileidticket !== "" ? model.txtProfileidticket : null,
                            AssignedEmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                            BranchID: 0,
                            Name: model.objcustomername !== "" ? model.objcustomername : null,
                            Email: model.objcustomermail !== "" ? model.objcustomermail : null,
                            subject: "Marketing",
                            Category: 462,
                            Message: model.txtMessage !== "" ? model.txtMessage : null,
                            Priority: 70,
                            Image: null,
                            CountryCode: model.objcountrycode !== "" && model.objcountrycode !== '0' && model.objcountrycode !== 0 ? model.objcountrycode : null,
                            AreaCode: null,
                            PhoneNum: model.objphonenumber !== "" && model.objphonenumber !== null && model.objphonenumber !== undefined ? model.objphonenumber : "",
                            EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : ""
                        };
                    }
                    ticketCreationService.ticketcreation(obj).then(function(response) {
                        console.log(response);
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'Ticket Created succesfully', 4000);
                        model.clearallcontrols();
                        model.scope.ticketcreationform.$setPristine();
                        model.scope.ticketcreationform.$setUntouched();
                    });
                };
                model.changetypeofticket = function() {
                    model.clearallcontrols();
                    model.scope.ticketcreationform.$setPristine();
                    model.scope.ticketcreationform.$setUntouched();
                };
                return model;
            }
        ]);
})();