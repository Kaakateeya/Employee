(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementPageNewModel', factory);

    factory.$inject = ['settlementPageNewService', 'complex-grid-config', 'modelpopupopenmethod'];

    function factory(settlementPageNewService, configgrid, modelpopupopenmethod) {
        var model = {};
        model.grid1 = {};
        model.grid2 = {};
        model.grid3 = {};

        model.scope = {};

        model.submit = function() {
            model.grid1.columns = [
                { text: 'groom profile id', key: 'GroomProfileID', type: 'label' },
                { text: 'groom name', key: 'GroomName', type: 'label' },
                { text: 'caste', key: 'groomcaste', type: 'label' },
                { text: 'profile owner ', key: 'GroomOwner', type: 'label' },
                { text: 'paid Type', key: 'BrideOwner', type: 'customlink', templateUrl: model.singleshowbuttons, method: model.openPouptoedit }

            ];

            model.grid2.columns = [
                { text: 'bride profile id', key: 'BrideProfileID', type: 'label' },
                { text: 'bride name', key: 'BrideName', type: 'label' },
                { text: 'caste', key: 'Bridecaste', type: 'label' },
                { text: 'bride owner', key: 'BrideOwner', type: 'label' },
                { text: 'paid Type', key: 'BrideOwner', type: 'customlink', templateUrl: model.singleshowbuttons, method: model.openPouptoedit }
            ];

            model.grid1.showsearchrows = true;
            model.grid1.showsearch = true;
            model.grid1.showpaging = false;
            model.grid1.myprofileexcel = true;
            model.grid1.normalexcel = true;
            model.grid1.totalRecords = 10;
            model.grid1.data = [{
                GroomProfileID: '310910220',
                GroomName: 'lakshmi',
                groomcaste: 'kamma',
                GroomOwner: 'Pushpa Narra',

            }];
            model.grid2.showsearchrows = true;
            model.grid2.showsearch = true;
            model.grid2.showpaging = false;
            model.grid2.myprofileexcel = true;
            model.grid2.normalexcel = true;
            model.grid2.totalRecords = 10;
            model.grid2.data = [{
                BrideProfileID: '210910352',
                BrideName: 'anil',
                Bridecaste: 'yadava',
                BrideOwner: 'Pushpa Narra'
            }];


            model.grid3.columns = [
                { text: 'ProfileID', key: 'BrideProfileID', type: 'custom', templateUrl: model.profileidmehod },
                { text: 'Name', key: 'BrideName', type: 'morelinks', templateUrl: model.nemeMethod },
                { text: 'Caste', key: 'Bridecaste', type: 'morelinks', templateUrl: model.casteMethod },
                { text: 'Owner', key: 'BrideOwner', type: 'morelinks', templateUrl: model.ownerMethod },
                { text: 'paid Type', key: 'BrideOwner', type: 'customlink', templateUrl: model.showbuttons, method: model.openPouptoedit }
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
                    GroomOwner: 'Pushpa Narra',

                },
                { BrideProfileID: '310910352', BrideName: 'vinisha', Bridecaste: 'yadava', BrideOwner: 'vijaya', GroomProfileID: '110910220', GroomName: 'anvesh', groomcaste: 'kapu', GroomOwner: 'Pushpa Narra' }
            ];

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
        model.singleshowbuttons = function() {
            var str = '<a>Paid</a>&nbsp;&nbsp;&nbsp;<a>PartialPaid</a>&nbsp;&nbsp;&nbsp;<a>NotIntToPay</a>';
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





        model.rowStyle = function(row) {
            var test = [
                { StatusID: 57, classes: 'settled' },
                { StatusID: 393, classes: 'settled' },
                { StatusID: 56, classes: 'Deleted' },
                { StatusID: 394, classes: 'Deleted' },
                { StatusID: 258, classes: 'closed' }
            ];
            return _.where(test, { StatusID: row.ProfileStatusID }).length >= 1 ? _.where(test, { StatusID: row.ProfileStatusID })[0].classes : (_.where(test, { StatusID: row.TicketStatusID }).length >= 1 ? _.where(test, { StatusID: row.TicketStatusID })[0].classes : '');
            // _.where(test, { StatusID: parseInt(row.ProfileStatusID) }).length > 0 ? _.where(test, { StatusID: parseInt(row.ProfileStatusID) })[0].classes : '';
        };









        return model;

    }
})();