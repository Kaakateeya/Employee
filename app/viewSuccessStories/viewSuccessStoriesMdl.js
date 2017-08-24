(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewSuccessStoriesModel', factory);
    factory.$inject = ['viewSuccessStoriesService', 'Commondependency', 'alert'];

    function factory(viewSuccessStoriesService, Commondependency, alertss) {

        var model = {};
        model.scope = {};
        model.init = function() {
            model.branchArr = Commondependency.branch('');
            return model;
        };
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.dependencyChange = function(parentval) {
            model.branchArr = Commondependency.branch(parentval);
        };

        model.viewStories = function() {
            var inobj = {
                profileID: model.profileID,
                Region: model.region,
                strCaste: model.caste ? model.caste.join(',') : null,
                strBranch: model.branch ? model.branch.join(',') : null,
                StartDate: model.fromDate,
                EndDate: model.toDate,
                PageSize: 20,
                PageNumber: 1,
                intlowerBound: 1,
                intUpperBound: 2,
                value: 1
            };

            viewSuccessStoriesService.viewSuccessStories(inobj).then(function(response) {
                if (response.data && response.data.length > 0) {
                    model.totalRows = response.data[0][0].TotalRows;
                    model.viewSuccessArray = response.data[1];
                }

            });
        };
        model.brideGroomChange = function(val, flag) {
            if (val) {
                viewSuccessStoriesService.getBrideGroomData(val, flag).then(function(response) {
                    if (response.data) {
                        switch (response.data.m_Item1) {
                            case 2:
                                var name = flag == 1 ? "Bride" : "Groom";
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Enter ' + name + ' ProfileID', 4500);
                                break;
                            case 3:
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile existed but not reviewed', 4500);
                                break;
                            case 6:
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Id must Be Settled or Waiting For Settlement', 4500);
                                break;
                            case 9:
                            case 10:
                            case 5:
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Id Alredy Exists in Success Story', 4500);
                                break;
                        }
                        if (response.data.m_Item1 === 1) {
                            if (flag === 1) {
                                model.brideName = response.data.m_Item2[3][0].PName;
                                model.brideCustID = response.data.m_Item2[3][0].Cust_ID;

                            } else if (flag === 2) {
                                model.groomName = response.data.m_Item2[3][0].PName;
                                model.groomCustID = response.data.m_Item2[3][0].Cust_ID;

                            }
                        } else {
                            model.cleartxt(flag);
                        }
                    }
                });
            }
        };

        model.cleartxt = function(flag) {
            if (flag === 1) model.txtbrideprofileid = '';
            else if (flag === 2) model.txtgroomprofileid = '';
        };
        model.createSuccessStory = function(sucessStoryID) {
            var inputobj = {
                EmpID: model.empid,
                BrideID: model.brideCustID,
                Bridename: model.brideName,
                GroomID: model.groomCustID,
                Groomname: model.groomName,
                StartDate: model.txtengagementdate,
                EndDate: model.txtmarriagedate,
                Attachphoto: model.ssssss,
                SuccesSstory: model.txtsuccessstories,
                Displayinweb: model.rbtndisplay,
                flag: 0,
                strSuccessstories: sucessStoryID
            };
            viewSuccessStoriesService.createSuccessStory(val, flag).then(function(response) {
                if (response.data === 1) {
                    if (model.upImage) {
                        keyname = 'Images/EmployeeImages/' + model.newuserID + '_EmplyeeImage/' + model.newuserID + '_EmplyeeImage.jpg';
                        fileUpload.uploadFileToUrl(model.upImage, '/employeeImgupload', keyname).then(function(res) {});
                    }
                }
            });
        };













        return model.init();

    }
})();