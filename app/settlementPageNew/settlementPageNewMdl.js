(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementPageNewModel', factory);

    factory.$inject = ['settlementPageNewService', 'complex-grid-config', 'modelpopupopenmethod'];

    function factory(settlementPageNewService, configgrid, modelpopupopenmethod) {
        var model = {};

        model.grid3 = {};

        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };

        model.submit = function() {
            model.grid3.columns = [
                { text: 'ProfileID', key: 'BrideProfileID', type: 'custom', templateUrl: model.profileidmehod },
                { text: 'Name', key: 'BrideName', type: 'morelinks', templateUrl: model.nemeMethod },
                { text: 'Caste', key: 'Bridecaste', type: 'morelinks', templateUrl: model.casteMethod },
                { text: 'Owner', key: 'BrideOwner', type: 'morelinks', templateUrl: model.ownerMethod },
                { text: 'paid Type', key: 'BrideOwner', type: 'customlink', templateUrl: model.showbuttons, method: model.openPouptoedit },
                { text: 'History', key: 'BrideOwner', type: 'customlink', templateUrl: model.showHistrybuttons, method: model.openPouptoedit }
            ];


            model.grid3.showsearchrows = true;
            model.grid3.showsearch = true;
            model.grid3.showpaging = false;
            model.grid3.myprofileexcel = true;
            model.grid3.normalexcel = true;
            model.grid3.totalRecords = 10;
            model.grid3.data = [{
                    BrideProfileID: '210910352',
                    BrideName: 'Lakshmi',
                    Bridecaste: 'yadava',
                    BrideOwner: 'Pushpa Narra',
                    GroomProfileID: '310910220',
                    GroomName: 'anil',
                    groomcaste: 'kamma',
                    GroomOwner: 'Pushpa Narra'
                },
                { BrideProfileID: '310910352', BrideName: 'vinisha', Bridecaste: 'yadava', BrideOwner: 'vijaya', GroomProfileID: '110910220', GroomName: 'anvesh', groomcaste: 'kapu', GroomOwner: 'Pushpa Narra' }
            ];

            var inobj = {
                i_PaidType: model.paidType,
                i_gender: model.rbtnGender,
                i_Region: model.joinArray(model.Region),
                t_Branch: model.joinArray(model.Branch),
                t_ProfileOwner: model.joinArray(model.ProfileOwner),
                d_settleStartDate: model.fromDate,
                d_settleEndDate: model.toDate,
                i_Startindex: 1,
                i_EndIndex: 10
            };

            settlementPageNewService.settledInfo(inobj).then(function(response) {


            });

        };


        model.joinArray = function(val) {
            var str = "";
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };


        model.profileidmehod = function(row) {
            var str = "<a>" + row.BrideProfileID + "</a><br><a>" + row.GroomProfileID + "</a>";
            return str;

        };
        model.nemeMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.BrideName + "</label><br><label style='font-weight: 200;'>" + row.GroomName + "</label>";
            return str;
        };

        model.casteMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.Bridecaste + "</label><br><label style='font-weight: 200;'>" + row.groomcaste + "</label>";
            return str;
        };
        model.ownerMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.BrideOwner + "</label><br><label style='font-weight: 200;'>" + row.GroomOwner + "</label>";
            return str;
        };



        model.showbuttons = function() {
            var str = '<a>Paid</a>&nbsp;&nbsp;&nbsp;<a>PartialPaid</a>&nbsp;&nbsp;&nbsp;<a>NotIntToPay</a><br><a>Paid</a>&nbsp;&nbsp;&nbsp;<a>PartialPaid</a>&nbsp;&nbsp;&nbsp;<a>NotIntToPay</a>';
            return str;
        };

        model.showHistrybuttons = function() {
            var str = '<a>History</a><br><a>History</a>';
            return str;
        };

        model.openPouptoedit = function() {
            modelpopupopenmethod.showPopup('aboutpayment.html', model.scope, 'md', '');
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };


        model.init = function() {
            return model;
        };


        return model;

    }
})();