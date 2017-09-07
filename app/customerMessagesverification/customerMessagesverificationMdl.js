(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('customerMessagesverificationModel', ['customerMessagesverificationService',
            'complex-grid-config', 'modelpopupopenmethod', 'alert', 'authSvc',
            function(customerMessagesverificationService, configgrid, modelpopupopenmethod,
                alerts, authSvc) {
                var model = {};
                model.showsearchrows = true;
                model.showsearch = false;
                model.showpaging = true;
                model.showClientpaging = false;
                model.myprofileexcel = true;
                model.normalexcel = true;
                model.showplus = false;
                model.showpaging = false;
                model.showClientpaging = false;
                model.myprofileexcel = false;
                model.gridTableshow = false;
                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                    var paid = row.FromProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.FromProfileID + "</a>" : "";
                    return paid;
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.FromProfileID + '/0', '_blank');
                };
                model.ProfileIdsendTemplateDUrl = function(row) {
                    var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                    var paid = row.ToProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ToProfileID + "</a>" : "";
                    return paid;
                };
                model.sendViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ToProfileID + '/0', '_blank');
                };
                model.updatecustomeredit = function(messgeid, body) {
                    model.txtcustomermessages = model.oldbody = body.replace("\\", "'");
                    model.messgeid = messgeid;
                    modelpopupopenmethod.showPopupphotopoup('messgeseditpopup.html', model.scope, 'md', "modalclassofedit");
                };
                model.allLinksTemplateDUrl = function(row) {
                    var strInputString = row.Body.replace(/'/g, "\\");
                    var paid = "<a style='cursor:pointer;' ng-click='model.updatecustomeredit(" + (row.MessageStatusID) + "," + JSON.stringify(strInputString) + ");'>Edit</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-disabled='model.isDisabledsubmit'  ng-click='model.updatecustomermessages(null," + row.MessageStatusID + ",1);'>Accept</a>&nbsp;&nbsp;&nbsp;<a style='cursor:pointer;' ng-disabled='model.isDisabledsubmit' ng-click='model.updatecustomermessages(null," + row.MessageStatusID + ",0);'>Reject</a>" +
                        "&nbsp;&nbsp;&nbsp;";
                    return paid;
                };
                model.customermeassgeverification = function() {
                    model.columns = [
                        { text: 'Sno', key: 'Sno', type: 'label' },
                        { text: 'FromProfileID', key: 'FromProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        { text: 'ToProfileID', key: 'ToProfileID', type: 'customlink', templateUrl: model.ProfileIdsendTemplateDUrl, method: model.sendViewProfile },
                        { text: 'Body', key: 'Body', type: 'label' },
                        { text: 'AllLinks', key: '', type: 'morelinks', templateUrl: model.allLinksTemplateDUrl },
                        { text: 'RequestDate', key: 'RequestDate', type: 'label' }
                    ];
                    var obj = {
                        i_Type: 1,
                        Body: null,
                        Subject: null,
                        MessagesID: null,
                        MessageStatusID: null,
                        EmpID: null
                    };
                    customerMessagesverificationService.customermeassgeverification(obj).then(function(response) {
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                            response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.customermessages = [];
                            model.customermessages = response.data[0];
                            model.TotalRows = response.data[0].length;
                            model.data = (response.data[0]);
                        }
                    });
                };
                model.updatecustomermessages = function(message, messageid, acceptrejectflag) {
                    model.isDisabledsubmit = true;
                    var obj = {
                        FromCustID: null,
                        ToCustID: null,
                        StrHtmlText: message,
                        MessageStatusId: null,
                        EmpId: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                        ReadFlag: 0,
                        MessageHistoryId: messageid,
                        Accepted: parseInt(acceptrejectflag),
                        MessageLinkId: null
                    };
                    customerMessagesverificationService.updatecustomermessages(obj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (parseInt(response.data) === 1) {
                            if (message !== null) {
                                model.close();
                            }
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Updated succesfully', 4000);
                            model.customermeassgeverification();
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Updated Failed', 4000);
                        }
                    });
                };
                model.close = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                return model;
            }
        ]);
})();