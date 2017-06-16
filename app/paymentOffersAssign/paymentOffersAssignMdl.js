(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymentOffersAssignModel', factory);

    factory.$inject = ['paymentOffersAssignService', 'modelpopupopenmethod', 'getArraysearch', 'Commondependency'];

    function factory(paymentOffersAssignService, modelpopupopenmethod, getArray, Commondependency) {
        return function() {
            var model = {};
            model.scope = {};
            model.paymentpoints = app.paymentPoints;
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
                    modelpopupopenmethod.showPopup('alert.html', model.scope, 'sm', '');
                }
            };
            model.closepopup = function() {
                modelpopupopenmethod.closepopup();
            };

            model.reset = function() {
                model.memberShipType = '';
                model.Caste = '';
            };

            model.SubmitPaymentOffer = function() {
                var obj = {
                    ProfileID: model.ProfileID,
                    MembershipID: model.memberShipType,
                    CasteID: model.Caste,
                    MembershipAmt: model.AgreedAmt,
                    ServiceTaxAmt: model.tax,
                    AllocatedPts: model.strPoints,
                    MemberShipDuration: model.strDate,
                    StartTime: moment().format('DD-MM-YYYY'),
                    EndDate: model.strDate

                };

                paymentOffersAssignService.submitPaymentOffer(obj).then(function(response) {
                    console.log(response);
                    model = {};
                });

            };

            model.casteDependency = function(val1, val2) {
                model.casteArr = Commondependency.casteDepedency(val1, val2);
            };

            return model;
        };
    }
})();