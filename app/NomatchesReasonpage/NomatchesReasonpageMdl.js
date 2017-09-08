(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('NomatchesReasonpageModel', factory);
    factory.$inject = ['NomatchesReasonpageService', 'Commondependency', '$timeout', 'complex-grid-config', '$filter', 'alert', 'modelpopupopenmethod', 'helperservice', 'SelectBindServiceApp'];

    function factory(NomatchesReasonpageService, Commondependency, timeout, complexgrid, $filter, alertss, commonpage, helperservice, SelectBindServiceApp) {
        var model = {};
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = true;
        model.showClientpaging = false;
        model.showplus = true;
        model.myprofileexcel = true;
        model.normalexcel = true;
        model.gridTableshow = false;
        model.Brancharray = [];
        model.ProfileOwnerarray = [];
        model.pageloadbindings = function() {
            model.getemployee('EmapName_Branch', '');
            // helperservice.getMyprofilebind(1, 2, '').then(function(response) {
            //     model.Brancharray = [];
            //     model.ProfileOwnerarray = [];
            //     _.each(response.data, function(item) {
            //         switch (item.CountryCode) {
            //             case "Branch":
            //                 model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
            //                 break;
            //             case "Profile Owner":
            //                 model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID, "display": item.Name });
            //                 break;
            //         }
            //     });
            // });
        };
        model.onchangebranch = function() {
            model.Brancharray = [];
            model.Brancharray = Commondependency.branch((model.rbtnregional !== undefined && model.rbtnregional !== null && model.rbtnregional !== "" && model.rbtnregional !== 0 && model.rbtnregional !== '0') ? (model.rbtnregional) : "");
        };

        model.onchangeemployee = function() {
            model.ProfileOwnerarray = [];
            model.ProfileOwnerarray = Commondependency.branch((model.tmarketingbranch !== undefined && model.tmarketingbranch !== null && model.tmarketingbranch !== "" && model.tmarketingbranch !== 0 && model.tmarketingbranch !== '0') ? (model.tmarketingbranch) : "");
        };
        model.resetreports = function() {
            model.rbtnregional = "";
            model.rbtnauthorize = "";
            model.data = [];
            timeout(function() {
                model.tmarketingbranch = "";
                model.tmarketingempname = "";
            }, 50);
            model.pageloadbindings();
            model.isDisabledsubmit = false;
        };
        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.Paidstatus === 1 ? 'paidclass' : 'unpaid';
            var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
            return paid;
        };
        model.ViewProfile = function(row) {
            //window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            window.open('/Education/' + row.Cust_ID, '_blank');
        };
        model.entereddatetemp = function(row) {
            var date = $filter('date')(row.EnteredDate, 'dd/MM/yyyy hh:mm:ss a');
            return date;
        };
        model.linktemplate = function(row) {
            var Edit = 'Edit';
            var Delete = 'Delete';
            var authorize = 'authorize';
            var links = "<a href='javascript:void(0);' ng-click='model.editdelete(" + JSON.stringify(row) + "," + JSON.stringify(Edit) + ");'>Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.editdelete(" + JSON.stringify(row) + "," + JSON.stringify(Delete) + ");'>Delete</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.editdelete(" + JSON.stringify(row) + "," + JSON.stringify(authorize) + ");'>Authorize</a>";
            return links;
        };
        model.columns = [
            // { text: 'Profile ID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
            { text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            { text: 'Profile Owner/Entered By', key: 'EnteredByEmpName', type: 'label' },
            { text: 'Entered Date', key: 'EnteredDate', type: 'morelinks', templateUrl: model.entereddatetemp },
            { text: 'Reason', key: 'Reason', type: 'label' },
            { text: '', key: 'TicketOwnerIDName', type: 'morelinks', templateUrl: model.linktemplate }
        ];
        model.binddata = function(type, flag, from, to) {
            model.empids = model.tmarketingempname !== undefined && model.tmarketingempname !== "" && model.tmarketingempname !== null && model.tmarketingempname.length > 0 ? model.tmarketingempname.toString() : null;
            model.i_Region = model.rbtnregional !== undefined && model.rbtnregional !== "" && model.rbtnregional !== null ? model.rbtnregional : null;
            model.v_Branch = model.tmarketingbranch !== undefined && model.tmarketingbranch !== "" && model.tmarketingbranch !== null && model.tmarketingbranch.length > 0 ? model.tmarketingbranch.toString() : null;
            model.i_Authorized = model.rbtnauthorize !== undefined && model.rbtnauthorize !== "" && model.rbtnauthorize !== null ? model.rbtnauthorize : null;
            var objnomatch = {
                v_EmpID: model.empids,
                i_Region: model.i_Region,
                v_Branch: model.v_Branch,
                i_flag: flag,
                i_Cust_ID: null,
                v_Reason: null,
                i_Authorized: model.i_Authorized,
                startindex: from,
                endindex: to
            };
            NomatchesReasonpageService.getnomatchesreason(objnomatch).then(function(response) {
                model.isDisabledsubmit = false;
                console.log(response);
                if (response.data !== null && response.data !== undefined && response.data.length > 0 && response.data[0] !== null && response.data[0] !== undefined && (response.data[0]).length !== 0) {
                    if (from === 1) {
                        model.TotalRows = (response.data[0][0]).TotalRows;
                    }
                    if (type === 'export') {
                        model.exportarray = [];
                        model.exportarray = (response.data[0]);
                        var options = {
                            headers: true,
                        };
                        alasql('SELECT ProfileID as ProfileID,TicketOwnerIDName as OwnerName,EnteredByEmpName,EnteredDate,Reason INTO  XLSX("Nomatches.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {

                        model.pageSize = 10;
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
        model.exportexcel = function(topage) {
            model.binddata("export", null, 1, model.TotalRows);
        };
        model.pagechange = function(val) {
            var to = val * 100;
            var from = val === 1 ? 1 : to - 99;
            var valuechange = val === 1 ? 1 : val;
            model.binddata("table", null, from, to);
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
                    var objnomatch = {
                        v_EmpID: null,
                        i_Region: null,
                        v_Branch: null,
                        i_flag: 1,
                        i_Cust_ID: row.Cust_ID,
                        v_Reason: null,
                        i_Authorized: null,
                        startindex: 1,
                        endindex: 10
                    };
                    console.log(objnomatch);
                    NomatchesReasonpageService.getnomatchesreason(objnomatch).then(function(response) {
                        console.log(response);
                        if (parseInt(response.data) === 1) {
                            (model.data).splice(row.rowIndex, 1);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Deleted Sucessfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Deleted Failed', 4500);
                        }
                    });
                    break;
                case 'authorize':
                    var objauthorize = {
                        v_EmpID: null,
                        i_Region: null,
                        v_Branch: null,
                        i_flag: 3,
                        i_Cust_ID: row.Cust_ID,
                        v_Reason: null,
                        i_Authorized: null,
                        startindex: 1,
                        endindex: 10
                    };
                    console.log(objauthorize);
                    NomatchesReasonpageService.getnomatchesreason(objauthorize).then(function(response) {
                        console.log(response);
                        if (parseInt(response.data) === 1) {
                            (model.data).splice(row.rowIndex, 1);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'authorized Sucessfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'authorized Failed', 4500);
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
            var objects = {
                v_EmpID: null,
                i_Region: null,
                v_Branch: null,
                i_flag: 2,
                i_Cust_ID: model.nomatchesobj.Cust_ID,
                v_Reason: strReason,
                i_Authorized: null,
                startindex: 1,
                endindex: 10
            };
            NomatchesReasonpageService.getnomatchesreason(objects).then(function(response) {
                console.log(response);
                if (parseInt(response.data) === 1) {
                    model.binddata('table', null, 1, 100);
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reason Updated Successfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reason Updated Failed', 4500);
                }
            });

        };
        model.closeupload = function() {
            commonpage.closepopuppoptopopup();
        };

        model.getemployee = function(flag, id) {
            SelectBindServiceApp.onlyEmpNames(flag, id).then(function(response) {
                console.log(response);
                if (_.isArray(response.data) && response.data.length > 0) {
                    _.each(response.data, function(item) {
                        if (item.CountryCode === 'EmapName')
                            model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        else
                            model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                }
            });
        };



        return model;
    }
})();