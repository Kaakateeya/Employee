(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('empTrackingModel', factory);

    factory.$inject = ['empTrackingService', 'commonFactory', 'complex-grid-config', 'modelpopupopenmethod', 'getArraysearch', '$timeout', 'SelectBindServiceApp'];

    function factory(empTrackingService, commonFactory, config, modelpopupopenmethod, getArraysearch, timeout, SelectBindServiceApp) {

        var model = {};
        model = config;
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };
        model.onlyempnames = [];
        model.onlyBranchArr = [];
        model.init = function() {
            model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 1, 14);
            model.wrkngHrs = '';
            model.getemployee('EmapName_Branch', '');
            model.branch = ["319", "320", "321", "322", "323", "324", "325", "326", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344"];
            return model;
        };
        model.wrkedHrsTemplate = function(row) {
            return '<label>' + row.TotalWorkedHours + '</label>';
        };

        // model.viewWrkHrs = function(empid) {
        //     model.empWorksheet(1, empid);
        //     model.empidbasedgridID = empid;
        //     modelpopupopenmethod.showPopupphotopoup('viewWrkedHrs.html', model.scope, 'lg', "");
        // };

        // model.empWorksheet = function(to, empid) {

        //     var inobj = {
        //         FromDate: model.fromdate,
        //         toDate: model.toDate,
        //         Employeename: empid,
        //         Branch: model.branch ? model.branch.join(',') : null,
        //         PageSize: 100,
        //         PageNumber: to,
        //         SerialnoFrom: null,
        //         serialnoto: null,
        //         flag: 0,
        //         Pagename: null,
        //         timings: 0
        //     };
        //     empTrackingService.getempWorksheet(inobj).then(function(response) {
        //         if (response.data) {
        //             model.histrydata = response.data[1];
        //             model.histrydataTotalRows = response.data[0][0].TotalRows;
        //         }
        //     });
        // };


        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.actionTemplate = function(row) {
            return '<a href="javascript:void(0);" ng-click="model.empDetails(' + JSON.stringify(row.EmployeeId) + ');">view</a>';
        };

        model.empDetails = function(empid) {
            model.getEmpReport(1, empid);
            modelpopupopenmethod.showPopupphotopoup('EmployeeDetailsPopup.html', model.scope, 'md', "");
        };

        model.getEmpReport = function(to, empid, type) {
            model.columns = [
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'Employee name', key: 'Name', type: 'label' },
                { text: 'Date of Joining', key: 'DateOfJoining', type: 'label' },
                { text: 'Official contact', key: 'OfficialContactNumber', type: 'label' },
                { text: 'Work phone', key: 'WorkPhone', type: 'label' },
                { text: 'Email Id', key: 'EmailId', type: 'label' },
                { text: 'Branch', key: 'BranchId', type: 'label' },
                { text: 'Total Worked Hours', key: 'TotalWorkedHours', type: 'morelinks', templateUrl: model.wrkedHrsTemplate },
                { text: 'Actions', key: '', type: 'morelinks', templateUrl: model.actionTemplate }
            ];
            var inobj = {
                EmpUserID: empid ? empid : null,
                Branch: model.branch ? model.branch.join(',') : null,
                EmployeeName: model.empNames ? model.empNames.join(',') : null,
                WorkingHours: model.wrkngHrs,
                StartDate: model.fromdate ? moment(model.fromdate).format('YYYY-MM-DD 00:00:00') : null,
                EndDate: model.toDate ? moment(model.toDate).format('YYYY-MM-DD 00:00:00') : null,
                FromRange: null,
                ToRange: null,
                PageNumber: to,
                PageSize: 100,
                flag: 0
            };

            model.empnamedisplay = '';
            model.empnamedisplay = '';
            empTrackingService.getempReport(inobj).then(function(response) {
                model.isDisabledsubmit = false;
                if (response.data && response.data[0].length > 0) {
                    if (empid) {
                        model.empDtailsArray = response.data[0];
                        model.empnamedisplay = response.data[0][0].Name;
                        model.EmpUserID = response.data[0][0].EmpUserID;
                    } else {
                        if (type === 'export') {
                            model.exportarray = [];
                            model.exportarray = response.data[0];
                            var options = {
                                headers: true,
                            };
                            alasql('SELECT Sno,Name as Employee_name,DateOfJoining as Date_of_Joining ,OfficialContactNumber as Official_contact,WorkPhone as  Work_phone ,EmailId as Email_Id,BranchId as Branch,TotalWorkedHours as Total_Worked_Hours INTO  XLSX("EditReports.xlsx",?) FROM ?', [options, model.exportarray]);
                        } else {
                            model.showpaging = true;
                            model.data = response.data[0];
                            model.TotalRows = response.data[1][0].TotalRows;
                        }
                    }
                }
            });
        };
        model.excelVal = 1;
        model.pagechange = function(val) {
            model.excelVal = val;
            var to = val * 100;
            var from = val === 1 ? 1 : to - 99;
            model.getEmpReport(val);
        };

        model.exportexcel = function() {
            model.getEmpReport(model.excelVal, undefined, "export");
        };

        model.getemployee = function(flag, id) {
            SelectBindServiceApp.onlyEmpNames(flag, id).then(function(response) {
                console.log(response);
                model.onlyempnames = [];
                if (_.isArray(response.data) && response.data.length > 0) {
                    _.each(response.data, function(item) {
                        if (item.CountryCode === 'EmapName')
                            model.onlyempnames.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        else
                            model.onlyBranchArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                }
            });
        };
        return model.init();
    }
})();