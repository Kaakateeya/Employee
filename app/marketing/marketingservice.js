(function() {
    'use strict';

    function factory(http) {
        return {
            getMarketingTicketBind: function(flag, ID) {
                return http.get(app.apiroot + 'EmployeeReportPage/getMyProfileBindings', {
                    params: {
                        flag: flag,
                        ID: ID
                    }
                });
            },

            getMarketingSlideShowBind: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MarketingTicketHistoryInfo', obj);
            },
            feeUpdate: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/FeeUpdate', obj);
            },
            sendSms: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/marketingSendSms', obj);
            },
            sendMail: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/marketingMailSend', obj);
            },
            marketreplytypeBind: function() {
                return http.get(app.apiroot + 'ExpressInterest/getMatchFollowup_linq', {
                    params: {
                        flag: 'Market_replytype',
                        ID: '',
                        RelationShipID: ''
                    }
                });
            },
            SettleDeleteInactive: function(custID, typeOfData) {
                return http.get(app.apiroot + 'CustomerPersonal/getViewAllCustomersSettledeleteinfo', { params: { CustID: custID, typeofdata: typeOfData } });
            },
            ResendMail: function(obj) {
                return http.post(app.apiroot + 'EmployeeReportPage/MatchFollowupResendMail', obj);
            }
        };
    }

    angular
        .module('Kaakateeya')
        .factory('marketingservice', factory)
    factory.$inject = ['$http'];
})(angular);