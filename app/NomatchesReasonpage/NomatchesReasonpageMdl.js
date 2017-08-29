(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('NomatchesReasonpageModel', factory);
    factory.$inject = ['NomatchesReasonpageService', 'Commondependency', '$timeout', 'complex-grid-config', '$filter', 'alert', 'modelpopupopenmethod'];

    function factory(NomatchesReasonpageService, Commondependency, timeout, complexgrid, $filter, alertss, commonpage) {
        var model = {};
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = false;
        model.showClientpaging = false;
        model.myprofileexcel = true;
        model.normalexcel = true;
        model.pageloadbindings = function() {
            NomatchesReasonpageService.getMyprofilebind(1, 2, '').then(function(response) {
                model.Brancharray = [];
                model.ProfileOwnerarray = [];
                _.each(response.data, function(item) {
                    switch (item.CountryCode) {
                        case "Branch":
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            break;
                        case "Profile Owner":
                            model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
                            break;
                    }
                });
            });
        };
        model.onchangebranch = function() {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch((model.rbtnregional !== undefined && model.rbtnregional !== null && model.rbtnregional !== "" && model.rbtnregional !== 0 && model.rbtnregional !== '0') ? (model.rbtnregional) : "");
        };


        model.onchangeemployee = function() {
            model.ProfileOwnerarray = [];
            model.ProfileOwnerarray = Commondependency.branch((model.tmarketingbranch !== undefined && model.tmarketingbranch !== null && model.tmarketingbranch !== "" && model.tmarketingbranch !== 0 && model.tmarketingbranch !== '0') ? (model.tmarketingbranch) : "");
        }
        model.resetreports = function() {
            model.rbtnregional = "";
            timeout(function() {
                model.tmarketingbranch = "";
                model.tmarketingempname = "";
            }, 50);
            model.pageloadbindings();
        };
        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.PaidStatus === 1 ? 'paidclass' : 'unpaid';
            var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
            return paid;
        };
        model.ViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
        };
        model.entereddatetemp = function(row) {
            var date = $filter('date')(row.EnteredDate, 'dd/MM/yyyy hh:mm:ss a');
            return date;
        };
        model.linktemplate = function(row) {
            debugger;
            var Edit = 'Edit';
            var Delete = 'Delete';
            var links = "<a href='javascript:void(0);' ng-click='model.editdelete(" + JSON.stringify(row) + "," + JSON.stringify(Edit) + ");'>Edit</a>&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.editdelete(" + JSON.stringify(row) + "," + JSON.stringify(Delete) + ");'>Delete</a>";
            return links;
        };
        model.columns = [{ text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            { text: 'Ticket ID', key: 'TicketOwnerIDName', type: 'label' },
            { text: 'Entered By', key: 'EnteredByEmpName', type: 'label' },
            { text: 'Entered Date', key: 'EnteredDate', type: 'morelinks', templateUrl: model.entereddatetemp },
            { text: 'Reason', key: 'Reason', type: 'label' },
            { text: '', key: '', type: 'morelinks', templateUrl: model.linktemplate }
        ];
        model.binddata = function(type, flag) {
            model.empids = model.tmarketingempname !== undefined && model.tmarketingempname !== "" && model.tmarketingempname !== null && model.tmarketingempname.length > 0 ? model.tmarketingempname.toString() : '';
            model.i_Region = model.rbtnregional !== undefined && model.rbtnregional !== "" && model.rbtnregional !== null ? model.rbtnregional : '';
            model.v_Branch = model.tmarketingbranch !== undefined && model.tmarketingbranch !== "" && model.tmarketingbranch !== null && model.tmarketingbranch.length > 0 ? model.tmarketingbranch : '';
            NomatchesReasonpageService.getnomatchesreason(model.empids, model.i_Region, model.v_Branch, flag, '', '').then(function(response) {
                console.log(response);
                if (response.data !== null && response.data !== undefined && response.data.length > 0 && response.data[0] !== null && response.data[0] !== undefined && (response.data[0]).length !== 0) {
                    if (type === 'export') {
                        model.exportarray = [];
                        model.exportarray = (response.data[0]);
                        var options = {
                            headers: true,
                        };
                        alasql('SELECT ProfileID as ProfileID,TicketOwnerIDName as OwnerName,EnteredByEmpName,EnteredDate,Reason INTO  XLSX("Nomatches.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {
                        model.pageSize = 10;
                        model.TotalRows = (response.data[0]).length;
                        model.data = response.data[0];
                        _.map(model.data, function(item, index) {
                            item.rowIndex = index;
                        });
                    }
                } else {
                    model.data = [];
                }
            });
        };
        model.exportexcel = function(array, columns) {
            model.binddata("export", '');
        };
        model.editdelete = function(row, type) {
            switch (type) {
                case 'Edit':
                    model.nomatchesobj = {};
                    model.nomatchesobj = row;
                    model.txtreasonnomatches = row.Reason;
                    commonpage.showPopupphotopoup('nomatchespopup.html', model.scope, 'md', "modalclassdashboardremainder");
                    break;
                case 'Delete':
                    NomatchesReasonpageService.getnomatchesreason('', '', '', 1, row.Cust_ID, '').then(function(response) {
                        console.log(response);
                        if (parseInt(response.data) === 1) {
                            debugger;
                            (model.data).splice(row.rowIndex, 1);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Deleted Sucessfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Deleted Failed', 4500);
                        }
                    });
                    break;
            }
        };
        model.nomatchessubmit = function() {
            console.log(model.nomatchesobj);
            commonpage.closepopuppoptopopup();
            // var Mobj = {
            //     intCust_ID: model.nomatchesobj.Cust_ID,
            //     strProfileID: model.nomatchesobj.ProfileID,
            //     intTicketOwnerID: model.nomatchesobj.TicketOwnerID,
            //     strReason: model.txtreasonnomatches !== null && model.txtreasonnomatches !== "" && model.txtreasonnomatches !== undefined ? model.txtreasonnomatches : null,
            //     intEnteredBy: model.empid
            // };
            // NomatchesReasonpageService.Nomatchesreasoninsert(Mobj).then(function(response) {
            //     if (response !== undefined && parseInt(response.data) === 1) {
            //         model.binddata();
            //         alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reason Updated Successfully', 2000);
            //     } else {
            //         alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reason Updated Failed', 2000);
            //     }
            // });
            var strReason = model.txtreasonnomatches !== null && model.txtreasonnomatches !== "" && model.txtreasonnomatches !== undefined ? model.txtreasonnomatches : null;
            NomatchesReasonpageService.getnomatchesreason('', '', '', 2, model.nomatchesobj.Cust_ID, strReason).then(function(response) {
                console.log(response);
                if (parseInt(response.data) === 1) {
                    model.binddata('table', '');
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reason Updated Successfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reason Updated Failed', 4500);
                }
            });

        };
        model.closeupload = function() {
            commonpage.closepopuppoptopopup();
        };
        return model;
    }
})();