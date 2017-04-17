(function(angular) {
    'use strict';

    function factory($http, getArray, timeout, matchFollowupServices, config, authSvc, Commondependency, modelpopupopenmethod) {
        var model = {};
        model = config;
        model.proceed = {};

        model.BranchName = [];
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";

        model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";

        model.templateUrl = "templates/matchFollowupSlide.html";
        model.headettemp = "templates/matchFollowupHeader.html";
        model.proceed.typeofPage = 'popup';
        model.typeofPage = 'page';
        model.headervisileble = true;
        model.EmpNamesArr = [];
        model.opendiv = true;
        model.activebutton = '';
        model.spflag = 0;
        model.closeflag = false;
        model.Empwaitingflag = false;
        model.frompage = 1;
        model.topage = 10;
        model.proceed.frompage = 1;
        model.proceed.topage = 10;
        model.init = function() {
            model.lstEmpnames = [parseInt(model.empid)];
            model.activebutton = 'bothside';
            model.matchFollowupSelect(model.empid);
            model.BranchName = getArray.GArray('BranchName');
        };
        matchFollowupServices.getMyprofilebind(1, 2, '').then(function(response) {
            _.each(response.data, function(item) {
                if (item.CountryCode === 'Profile Owner') {
                    model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                }
            });
        });

        model.matchFollowupSelect = function(empid, custID, typeofpopup) {

            var inputobj = {
                empid: model.empid,
                strProfileOwner: empid !== undefined ? empid : (parseInt(model.Managementid) === 1 ? (_.isArray(model.lstEmpnames) ? (model.lstEmpnames).join(',') : '') : model.empid),
                strProfileOwnerBranch: _.isArray(model.lstBranchs) ? (model.lstBranchs).join(',') : '',
                Fromdate: model.txtFromProceedDate !== undefined && model.txtFromProceedDate !== '' ? model.txtFromProceedDate : '',
                Todate: model.txtToProceedDate !== undefined && model.txtToProceedDate !== '' ? model.txtToProceedDate : '',
                Spflag: model.spflag,
                CustID: custID,
                strregion: model.lstregions !== undefined ? model.lstregions : '',
                oppclose: model.closeflag,
                Empwaiting: model.Empwaitingflag
            }
            if (typeofpopup === 'proceedpopup') {
                inputobj.pagefrom = model.proceed.frompage;
                inputobj.pageto = model.proceed.topage;
            } else {
                inputobj.pagefrom = model.frompage;
                inputobj.pageto = model.topage;
            }
            console.log(JSON.stringify(inputobj));
            matchFollowupServices.matchFollowupSelect(inputobj).then(function(response) {
                console.log(response);
                if (_.isArray(response.data) && response.data.length > 0) {
                    if (typeofpopup === 'proceedpopup') {
                        model.proceed.totalRecords = response.data[0].TotalRows;
                        if (parseInt(model.proceed.frompage) === 1) {
                            model.proceed.slides = [];
                            model.proceed.slides = response.data;
                        } else {
                            model.proceed.slides = $.merge(model.proceed.slides, response.data);
                        }
                    } else {
                        model.totalRecords = response.data[0].TotalRows;
                        if (parseInt(model.frompage) === 1) {
                            model.setSlides(response.data, 10, 'normal');
                        } else {
                            model.addSlides(response.data, model.slides, parseInt(model.topage), 'normal');
                        }
                    }
                }
            });
        };

        model.slidebind = function(old, news, array, type) {
            if (type === 'popup') {
                if (parseInt(model.proceed.topage) - parseInt(news) === 4) {
                    debugger;
                    model.proceed.frompage = parseInt(model.proceed.topage) + 1;
                    model.proceed.topage = parseInt(model.proceed.topage) + 10;
                    model.matchFollowupSelect(undefined, model.custid, 'proceedpopup');
                }
            } else {
                if (parseInt(model.topage) - parseInt(news) === 4) {
                    debugger;
                    model.frompage = parseInt(model.topage) + 1;
                    model.topage = parseInt(model.topage) + 10;
                    model.matchFollowupSelect();
                }
            }
        };


        model.CondtionButtonClick = function(activeType, flag, flagClose, flagEmpwaiting) {
            model.activebutton = activeType;
            model.spflag = flag;
            model.closeflag = flagClose;
            model.Empwaitingflag = flagEmpwaiting;
            model.frompage = 1;
            model.topage = 10;
            model.matchFollowupSelect();
        };

        model.regionChange = function(parent) {
            model.BranchName = [];
            model.BranchName = Commondependency.BranchNamebind((parent !== undefined && parent !== null && parent !== "") ? (parent).toString() : "");
        };


        model.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        };

        model.proceedImage = function(status) {

            var src = '';
            if (status.trim() === "I") {
                src = 'src/images/heartgrren.gif';
            } else if (status.trim() === "NI") {
                src = 'src/images/brkhrtgreen.gif';
            }
            return src;
        };

        model.openActionPopup = function() {
            modelpopupopenmethod.showPopup('Actions.html', model.scope, 'lg', 'Actioncls');
        };

        model.ProceededProfiles = function(serviceCount, empname) {
            var splitEmpName = empname.split('-');
            return (parseInt(serviceCount) > 1 && model.loginempName.trim() === splitEmpName[0].trim()) ? true : false;
        };
        model.serviceCountProfiles = function(custid) {
            model.custid = custid;
            model.proceed.templateUrl = "templates/matchFollowupSlide.html";
            model.proceed.headettemp = "templates/matchFollowupHeader.html";
            model.proceed.frompage = 1;
            model.proceed.topage = 10;
            model.matchFollowupSelect(undefined, custid, 'proceedpopup');
            modelpopupopenmethod.showPopup('Proceedslide.html', model.scope, 'lg', "");
        };

        model.proceed.closepopup = function() {
            modelpopupopenmethod.closepopup();
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', factory);
    factory.$inject = ['$http', 'getArraysearch', '$timeout', 'matchFollowupServices', 'complex-slide-config', 'authSvc', 'Commondependency', 'modelpopupopenmethod'];
})(angular);