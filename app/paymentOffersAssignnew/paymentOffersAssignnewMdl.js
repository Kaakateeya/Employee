(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('paymentOffersAssignnewModel', ['paymentOffersAssignnewService', 'modelpopupopenmethod', 'getArraysearch',
            'Commondependency', 'alert', 'complex-grid-config', '$timeout',
            function(paymentOffersAssignService, modelpopupopenmethod, getArray, Commondependency, alertss, configgrid, timeout) {
                var model = {};
                model.scope = {};
                model.paymentpoints = app.paymentPoints;
                model.noofDays = '';
                model.membershipTypeArr = [
                    { "label": "--select--", "title": "--select--", "value": "" },
                    { "label": "Basic", "title": "Basic", "value": 1 },
                    { "label": "Basic Plus", "title": "Basic Plus", "value": 2 },
                    { "label": "Premium", "title": "Premium", "value": 3 },
                    { "label": "Premium plus", "title": "Premium Plus", "value": 4 }
                ];

                model.showOfferDetails = function(Amt) {
                    if (Amt !== undefined && Amt !== '') {
                        var num = Amt * app.PaymentDays;
                        model.strAmt = Amt;
                        model.strDate = moment().add(parseInt(num), 'days').format('DD-MM-YYYY');
                        model.strPoints = parseInt(model.casteofcandidate) === 402 ? (Amt * app.kammaPaymentPoints) : (Amt * model.paymentpoints);
                        //parseInt(Amt * model.paymentpoints);
                        var infm = 'Agreed Amount : ' + Amt + '    \n     No of Points : ' + model.strPoints + '    \n Expiry Date : ' + model.strDate;
                        if (model.showOfferDetailsflag !== 1) {
                            model.showOfferDetailsflag = 1;
                            modelpopupopenmethod.showPopup('alert.html', model.scope, 'sm', '');
                        }
                        model.noofDays = num;
                    }
                };
                model.closepopup = function() {
                    model.showOfferDetailsflag = 0;
                    modelpopupopenmethod.closepopup();
                };

                model.reset = function() {
                    model.data = [];
                    model.btntextSubmit = 'Submit';
                    model.ProfileID = "";
                    model.AgreedAmt = "";
                    timeout(function() {
                        model.memberShipType = '';
                        model.Caste = '';
                        model.religion = '';
                        model.mothertongue = 0;
                    }, 500);
                    model.isDisabledsubmit = false;
                };
                model.SubmitPaymentOffer = function() {
                    if (model.btntextSubmit === 'Submit') {
                        model.isDisabledsubmit = true;
                        var obj = {
                            ProfileID: model.rbtntype === '1' ? model.ProfileID : null,
                            MembershipID: model.memberShipType,
                            CasteID: model.rbtntype === '2' ? model.Caste : null,
                            MembershipAmt: model.AgreedAmt
                        };
                        paymentOffersAssignService.submitPaymentOffer(obj).then(function(response) {
                            model.isDisabledsubmit = false;
                            if (response.data && parseInt(response.data) === 1) {
                                model.reset();
                                model.ProfileID = '';
                                model.AgreedAmt = '';
                                model.scope.offerForm.$setPristine();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Membership inserted successfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Membership insertion failed ', 4500);
                            }
                        });
                    } else {
                        var mobj = {
                            strProfileID: model.rbtntype === '1' ? model.ProfileID : null,
                            intPaymentID: model.membershipid,
                            intMemberShipTypeID: model.memberShipType,
                            floatAgreedAmt: model.AgreedAmt,
                            intCasteID: model.rbtntype === '2' ? parseInt(model.Caste) : null,
                            intFlagID: 1
                        };
                        model.deleteeditoaymentoffers(mobj);
                    }
                };

                model.deleteeditoaymentoffers = function(obj) {
                    paymentOffersAssignService.Editdeletepaymentoffers(obj).then(function(response) {
                        if (response.data && parseInt(response.data) === 1) {
                            var msg = obj.intFlagID === 1 ? 'Membership updated successfully' : 'Membership Deleted successfully';
                            alertss.timeoutoldalerts(model.scope, 'alert-success', msg, 4500);
                            model.getPaymentdetails(model.rbtntype === '1' ? 'profileid' : 'caste');
                        } else {
                            var msgs = obj.intFlagID === 1 ? 'Membership updated failed' : 'Membership Deleted failed';
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', msgs, 4500);
                        }
                    });
                };
                model.casteDependency = function(val1, val2) {
                    model.casteArr = Commondependency.casteDepedency(val1, val2);
                };
                model.changetypeofticket = function() {
                    model.reset();
                    model.ProfileID = "";
                    model.AgreedAmt = "";
                    model.scope.offerForm.$setPristine();
                    model.scope.offerForm.$setUntouched();
                };
                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.IsPaidMember === 372 ? 'paidclass' : 'unpaid';
                    var paid = row.ProfileID !== undefined ? "<a href='javascript:void(0);' class='paidclass'>" + row.ProfileID + "</a><br>" : "";
                    return paid;
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
                };
                model.editpayment = function(row) {
                    var editpayment = "<a href='javascript:void(0);' ng-click='model.editpaymentcontrols(" + JSON.stringify(row.MemberShipAmount) + "," + JSON.stringify(row.MemberShipTypeID) + "," + row.MembershipType + "," + row.CasteID + ");'>Edit</a>";
                    return editpayment;
                };
                model.deletepayment = function(row) {
                    var deletepayment = "<a href='javascript:void(0);' ng-click='model.deletepaymentoffers(" + JSON.stringify(row.MemberShipAmount) + "," + JSON.stringify(row.MemberShipTypeID) + "," + row.MembershipType + "," + row.CasteID + ");'>Delete</a>";
                    return deletepayment;
                };
                model.editpaymentcontrols = function(amount, membershipid, typeid, casteid) {
                    model.btntextSubmit = 'Edit';
                    model.memberShipType = typeid !== null ? parseInt(typeid) : '';
                    model.AgreedAmt = parseInt(amount);
                    model.membershipid = membershipid;
                };
                model.deletepaymentoffers = function(amount, membershipid, typeid, casteid) {
                    model.btntextSubmit = 'Submit';
                    var mobj = {
                        strProfileID: model.rbtntype === '1' ? model.ProfileID : null,
                        intPaymentID: membershipid,
                        intMemberShipTypeID: null,
                        floatAgreedAmt: null,
                        intCasteID: model.rbtntype === '2' ? casteid : null,
                        intFlagID: 0
                    };
                    model.deleteeditoaymentoffers(mobj);
                };

                model.membershipchange = function() {
                    if (model.btntextSubmit === 'Submit') {
                        var test = [];
                        test = _.where(model.data, { MembershipType: parseInt(model.memberShipType) });
                        if (test.length > 0) {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Membership Already there ', 4500);
                            model.memberShipType = '';
                        } else {}
                    }
                };
                model.getPaymentdetails = function(type) {
                    model.data = [];
                    model.columns = [
                        { text: 'Profileid', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        { text: 'Points', key: 'AllottedServicePoints', type: 'label' },
                        { text: 'Amount', key: 'MemberShipAmount', type: 'label' },
                        { text: 'MemberShipDuration', key: 'MemberShipDuration', type: 'label' },
                        { text: 'MemberShipName', key: 'MemberShipName', type: 'label' },
                        { text: 'Edit', key: 'MemberShipName', type: 'morelinks', templateUrl: model.editpayment },
                        { text: 'Delete', key: 'MemberShipName', type: 'morelinks', templateUrl: model.deletepayment }
                    ];
                    var profileid = null,
                        casteid = null;
                    if (type === 'profileid') {
                        profileid = model.ProfileID;
                        casteid = "";
                    } else {
                        profileid = "";
                        casteid = model.Caste !== "" && model.Caste !== null && model.Caste !== undefined && model.Caste !== 0 && model.Caste !== '0' ? model.Caste : null;
                    }
                    paymentOffersAssignService.selectbasedoncasteprofileid(profileid, casteid).then(function(response) {
                        console.log(response);
                        if (response !== null && response.data !== undefined && response.data !== null && response.data !== "" &&
                            response.data[0] !== undefined && response.data[0] !== null && response.data[0].length > 0) {
                            model.data = [];
                            model.TotalRows = response.data[0][0].TotalRows;
                            model.casteofcandidate = response.data[0][0].CasteID;
                            model.data = response.data[0];
                        }
                    });
                };
                return model;
            }
        ]);
})();