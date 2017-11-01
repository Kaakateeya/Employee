(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('settlementPageNewModel', factory);

    factory.$inject = ['settlementPageNewService', 'complex-grid-config', 'modelpopupopenmethod', 'alert', 'Commondependency'];

    function factory(settlementPageNewService, configgrid, modelpopupopenmethod, alertss, Commondependency) {
        var model = {};

        model.grid3 = {};
        model.singlegrid1 = {};
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };
        model.paidStausFlag = true;
        model.submit = function(from, to, type) {
            model.grid3.columns = [
                { text: 'ProfileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.profileidmehod },
                { text: 'Name', key: 'BrideName', type: 'morelinks', templateUrl: model.nemeMethod },
                { text: 'Caste', key: 'BrideCaste', type: 'morelinks', templateUrl: model.casteMethod },
                { text: 'Profile Owner', key: 'BrideOwner', type: 'morelinks', templateUrl: model.ownerMethod },
                { text: 'Settle Date', key: 'SettledDate', type: 'label' },
                { text: 'paid Type', key: 'GroomCaste', type: 'morelinks', templateUrl: model.showbuttons },
                { text: 'History', key: 'GroomName', type: 'morelinks', templateUrl: model.showHistrybuttons }
            ];
            model.paidStausFlag = model.paidType && model.paidType === '574' ? false : true;
            model.grid3.showsearchrows = true;
            model.grid3.showsearch = true;
            model.grid3.showpaging = true;
            model.grid3.myprofileexcel = true;
            model.grid3.normalexcel = true;

            var inobj = {
                i_PaidType: model.paidType && model.paidType !== '' ? model.paidType : null,
                i_gender: model.rbtnGender,
                i_Region: model.joinArray(model.Region),
                t_Branch: model.joinArray(model.Branch),
                t_ProfileOwner: model.joinArray(model.ProfileOwner),
                d_settleStartDate: model.fromDate ? moment(model.fromDate).format('YYYY-MM-DD') : null,
                d_settleEndDate: model.toDate ? moment(model.toDate).format('YYYY-MM-DD') : null,
                i_Startindex: from,
                i_EndIndex: to
            };

            settlementPageNewService.settledInfo(inobj).then(function(response) {
                if ((response.data[0]).length > 0) {
                    if (type === 'excel') {
                        model.exportarray = [];
                        model.exportarray = (response.data[0]);
                        var options = {
                            headers: true
                        };
                        alasql('SELECT BrideProfileID,BrideName,BrideCaste,BrideOwner,GroomProfileID,GroomName,GroomCaste,GroomOwner INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {
                        model.panelbodyhide = false;
                        model.grid3.TotalRows = (response.data[0])[0].TotalRows;
                        model.grid3.data = (response.data[0]);
                    }
                } else {
                    if (from === 1) {
                        model.grid3.data = [];
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 3500);
                    }
                }
            });
        };

        model.joinArray = function(val) {
            var str = null;
            if (val && val.length > 0) {
                str = val.join(',');
            }
            return str;
        };

        model.profileidmehod = function(row) {

            var bridefirsthalfcls = row.Bride_SettleAmtStatus === 574 ? 'paidclass' : (row.Bride_SettleAmtStatus === 575 ? 'paidclass' : 'unpaid');
            var brideNexthalfcls = row.Bride_SettleAmtStatus === 574 ? 'paidclass' : 'unpaid';

            var groomfirsthalfcls = row.Groom_SettleAmtStatus === 574 ? 'paidclass' : (row.Groom_SettleAmtStatus === 575 ? 'paidclass' : 'unpaid');
            var groomNexthalfcls = row.Groom_SettleAmtStatus === 574 ? 'paidclass' : 'unpaid';

            var bridefirsthalf = "<span class='" + bridefirsthalfcls + "'>" + row.BrideProfileID.substr(0, 5) + "</span>";
            var brideNexthalf = "<span class='" + brideNexthalfcls + "'>" + row.BrideProfileID.substr(5, 4) + "</span>";

            var groomfirsthalf = "<span class='" + groomfirsthalfcls + "'>" + row.GroomProfileID.substr(0, 5) + "</span>";
            var groomNexthalf = "<span class='" + groomNexthalfcls + "'>" + row.GroomProfileID.substr(5, 4) + "</span>";

            var brideSAdisplay = row.BrideSettleForm === null ? 'No SA Form' : 'View SA Form';
            var groomSAdisplay = row.GroomSettleForm === null ? 'No SA Form' : 'View SA Form';

            var brideSAdisplaycls = row.BrideSettleForm === null ? 'Linkdisabledredcolor' : '';
            var groomSAdisplaycls = row.GroomSettleForm === null ? 'Linkdisabledredcolor' : '';

            var str = "<a href='javascript:void(0);' ng-click='model.viewfullprofile(" + JSON.stringify(row.BrideProfileID) + ")' >" + bridefirsthalf + brideNexthalf + "</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.showSAmethod(" + JSON.stringify(row.BrideSettleForm) + ")' class=" + brideSAdisplaycls + ">" + brideSAdisplay + "</a><br><a href='javascript:void(0);' ng-click='model.viewfullprofile(" + JSON.stringify(row.GroomProfileID) + ")'>" + groomfirsthalf + groomNexthalf + "</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.showSAmethod(" + JSON.stringify(row.GroomSettleForm) + ")'  class=" + groomSAdisplaycls + ">" + groomSAdisplay + "</a>";
            return str;
        };

        model.grid3.viewfullprofile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
        };

        model.nemeMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.BrideName + "</label><br><label style='font-weight: 200;'>" + row.GroomName + "</label>";
            return str;
        };

        model.casteMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.BrideCaste + "</label><br><label style='font-weight: 200;'>" + row.GroomCaste + "</label>";
            return str;
        };

        model.ownerMethod = function(row) {
            var str = "<label style='font-weight: 200;'>" + row.BrideOwner + ' (' + row.BrideEmpUserName + ")</label><br><label style='font-weight: 200;'>" + row.GroomOwner + ' (' + row.GroomEmpUserName + ")</label>";
            return str;
        };

        model.showbuttons = function(row) {
            var str = '',
                bridestr, groomstr;
            bridestr = row.Bride_SettleAmtStatus === 574 ? '--' : "<a href='javascript:void(0);' ng-click='model.openPouptoedit(" + JSON.stringify(row.BrideProfileID) + "," + JSON.stringify('574') + ");'>Paid</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'  ng-click='model.openPouptoedit(" + JSON.stringify(row.BrideProfileID) + "," + JSON.stringify('575') + ");'>PartialPaid</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.openPouptoedit(" + JSON.stringify(row.BrideProfileID) + "," + JSON.stringify('577') + ");'>NotIntToPay</a>";
            groomstr = row.Groom_SettleAmtStatus === 574 ? '--' : "<a href='javascript:void(0);' ng-click='model.openPouptoedit(" + JSON.stringify(row.GroomProfileID) + "," + JSON.stringify('574') + ");'>Paid</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.openPouptoedit(" + JSON.stringify(row.GroomProfileID) + "," + JSON.stringify('575') + ");'>PartialPaid</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.openPouptoedit(" + JSON.stringify(row.GroomProfileID) + "," + JSON.stringify('577') + ");'>NotIntToPay</a>";
            str = bridestr + '<br>' + groomstr;
            return str;
        };

        model.showHistrybuttons = function(row) {
            var str = "<a href='javascript:void(0);' ng-click='model.getSettleHistryInfo(" + JSON.stringify(row.BrideProfileID) + ");'>History</a><br><a href='javascript:void(0);' ng-click='model.getSettleHistryInfo(" + JSON.stringify(row.GroomProfileID) + ");'>History</a>";
            return str;
        };

        model.grid3.openPouptoedit = function(id, status) {
            debugger;
            model.strdisplay = status === '574' ? 'Paid' : (status === '575' ? 'Partial Paid' : 'Not interest to pay');
            model.txtdescription = '';
            model.insertProfileID = id;
            model.insertStatus = status;
            modelpopupopenmethod.showPopup('aboutpayment.html', model.scope, 'md', '');
        };

        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.init = function() {
            return model;
        };

        model.reset = function() {
            var date = moment().subtract(6, 'months').format('DD MMM YYYY');
            model.fromDate = date;
            model.toDate = moment().format('DD MMM YYYY');
            model.paidType = '';

            model.Region = '';
            model.Branch = '';
            model.ProfileOwner = '';
            model.rbtnGender = '';
            model.BranchNameArr = Commondependency.branch('');
        };

        model.grid3.pagechange = function(val) {
            var to = val * 100;
            var from = val === 1 ? 1 : to - 99;
            model.submit(from, to);
        };
        model.insertProfileID = 0;
        model.insertSettleAmount = function() {
            var inobj = {
                s_ProfileID: model.insertProfileID,
                i_SettlementType: model.insertStatus,
                i_Discription: model.txtdescription,
                s_EnteredBy: model.empid
            };

            settlementPageNewService.insertSettledInfo(inobj).then(function(response) {
                model.close();
                if (parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'updated successfully', 3500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'updation failed', 3500);
                }
            });

        };

        model.grid3.getSettleHistryInfo = function(id) {
            model.singlegrid1.columns = [
                { text: 'Payment status', key: 'paymentStatus', type: 'label' },
                { text: 'Entered Date', key: 'SettledDate', type: 'label' },
                { text: 'Entered By', key: 'enteredBy', type: 'label' },
                { text: 'Notes', key: 'Discription', type: 'label' }
            ];

            settlementPageNewService.settleInfo(id).then(function(response) {
                if (response.data.length > 0) {
                    model.singlegrid1.sdata = response.data;
                    model.singlegrid1.sdata.forEach(function(element) {
                        element.SettledDate = moment(element.SettledDate).format('DD-MM-YYYY');

                    }, this);


                    modelpopupopenmethod.showPopup('duplicataProfilesPopup.html', model.scope, 'lg', "modalclassdashboardphotopopupassign");
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No Records Found', 3500);
                }
            });

        };

        model.closemainpopup = function() {
            modelpopupopenmethod.closepopup();
        };

        model.regionChange = function(parent) {
            model.BranchNameArr = [];
            model.BranchNameArr = Commondependency.branch(model.joinArray(parent));
        };

        model.grid3.exportexcel = function(topage) {
            model.submit(1, topage, 'excel');
        };
        model.grid3.showSAmethod = function(saform) {
            if (saform) {
                var imgArr = saform.replace(/\\/g, '/');
                model.image = app.GlobalImgPath + imgArr.substring(2);
                modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, 'md', '');
            }
        };
        return model;
    }
})();