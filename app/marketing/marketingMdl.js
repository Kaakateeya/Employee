(function() {
    'use strict';

    function factory(marketingservice, config) {
        var model = {};
        model = config;
        model.headervisileble = true;
        model.templateUrl = "templates/marketingSlide.html";
        model.headettemp = "templates/marketingSlideHeader.html";
        model.EmpNamesArr = [];

        model.init = function() {

            model.MarketingTicketBind(1, 2);
            model.MarketingSlideShowBind(0, 0, 0, 0);

            model.arraydata = [{ custid: 91022, name: 'dsdfsdf' },
                { custid: 12121, name: 'fgdfg' }, { custid: 34343, name: 'ffffff' },
                { custid: 34343, name: 'ffffff' }
            ];

            model.setSlides(model.arraydata, 10, 'normal');
            return model;

        };

        model.slidebind = function(old, news, array, type) {};

        model.MarketingSlideShowBind = function(Marketreminder, GuestTickets, Onlineexpiry, Ooflineexpiry) {

            var inputobj = {

                strBranch: model.Brancharray ? (model.Brancharray).join(',') : null,
                strEmpName: '8',
                i_isAdmin: 1,
                i_EmpID: 2,
                i_PageFrom: 1,
                i_PageTo: 10,
                dtFromProceedDate: null,
                dtToProceedDate: null,
                i_days: null,
                i_RegionID: null,
                v_MarketremindeFlag: Marketreminder,
                v_siblingflag: 0,
                v_guestticketflag: GuestTickets,
                v_OnlineExprd: Onlineexpiry,
                v_OfflineExprd: Ooflineexpiry,
                i_TicketId: null,
                i_EmailId: null,
                i_PhoneNumber: null,
                i_Name: null,
                dt_Opendate: null,
                i_ProfileId: null,
                i_Category: null,
                i_Ticketstatus: null,
                dt_FromRemainderdate: null,
                dt_ToReminderdate: null,
                i_Excelflag: null,
                V_Notpay: null

            }

            marketingservice.getMarketingSlideShowBind(inputobj).then(function(response) {

                model.Marketingslideticket = [];
                model.MarketingslideHistory = [];
                model.Test = [];
                model.Array = [];
                model.Marketingslideticket = response.data.Marketingslideticket;
                model.MarketingslideHistory = response.data.MarketingslideHistory;

                _.map(response.data.Marketingslideticket, function(item) {
                    var hidtryArray = _.where(response.data.MarketingslideHistory, { Emp_Ticket_ID: item.Emp_Ticket_ID.toString() }, function(inneritem) {
                        debugger;
                        var daddd = inneritem;
                    });

                    item.histryObj = hidtryArray;
                    debugger;

                });

                model.setSlides(response.data.Marketingslideticket, 10, 'normal');

            });
        };

        model.MarketingTicket = function(Marketreminder, GuestTickets, Onlineexpiry, Ooflineexpiry) { model.MarketingSlideShowBind(Marketreminder, GuestTickets, Onlineexpiry, Ooflineexpiry); };

        model.MarketingTicketBind = function(flag, ID) {

            marketingservice.getMarketingTicketBind(flag, ID).then(function(response) {

                model.applicationStatusarray = [];
                model.Castearray = [];
                model.ProfileOwnerarray = [];
                model.Brancharray = [];

                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Profile Owner":
                            model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;

                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                    }
                });
            });
        };

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('marketingModel', factory)
    factory.$inject = ['marketingservice', 'complex-slide-config'];

})(angular);