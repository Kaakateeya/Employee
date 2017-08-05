(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentOffersAssignnewModel', ['paymentOffersAssignnewService', 'modelpopupopenmethod', 'getArraysearch', 'Commondependency', 'alert', 'complex-grid-config',
            function(paymentOffersAssignService, modelpopupopenmethod, getArray, Commondependency, alertss, configgrid) {
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
                        model.strPoints = parseInt(Amt * model.paymentpoints);
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
                    model.memberShipType = '';
                    model.Caste = '';
                    model.religion = '';
                    model.mothertongue = '';
                    model.data = [];

                };

                model.SubmitPaymentOffer = function() {
                    var obj = {
                        ProfileID: model.ProfileID,
                        MembershipID: model.memberShipType,
                        CasteID: model.ProfileID ? undefined : model.Caste,
                        MembershipAmt: model.AgreedAmt,
                        // ServiceTaxAmt: model.tax,
                        AllocatedPts: model.strPoints,
                        MemberShipDuration: model.noofDays,
                        StartTime: moment().format('DD-MM-YYYY'),
                        EndDate: model.strDate
                    };

                    paymentOffersAssignService.submitPaymentOffer(obj).then(function(response) {
                        if (response.data && parseInt(response.data) === 1) {
                            model.reset();
                            model.ProfileID = '';
                            model.AgreedAmt = '';
                            // model.tax = '';
                            model.scope.offerForm.$setPristine();
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Membership inserted successfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Membership insertion failed ', 4500);
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
                    var editpayment = "<a href='javascript:void(0);' ng-click='model.editpaymentcontrols(" + JSON.stringify(row.MemberShipAmount) + "," + JSON.stringify(row.MemberShipTypeID) + "," + row.MembershipType + ");'>Edit</a>";
                    return editpayment;
                };
                model.deletepayment = function(row) {
                    var deletepayment = "<a href='javascript:void(0);' ng-click='model.deletepaymentoffers(" + JSON.stringify(row.MemberShipAmount) + "," + JSON.stringify(row.MemberShipTypeID) + "," + row.MembershipType + ");'>Delete</a>";
                    return deletepayment;
                };
                model.editpaymentcontrols = function(amount, membershipid, typeid) {
                    model.memberShipType = typeid;
                    model.AgreedAmt = parseInt(amount);
                    model.membershipid = membershipid;
                };
                model.deletepaymentoffers = function(amount, membershipid, typeid) {
                    //model.memberShipType = typeid;
                    //model.AgreedAmt = parseInt(amount);
                    model.membershipid = membershipid;

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
                            model.data = response.data[0];
                        }
                    });
                };
                return model;
            }
        ]);
})();