(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewSuccessStoriesModel', factory);

    factory.$inject = ['viewSuccessStoriesService', 'Commondependency', 'alert', 'fileUpload', 'modelpopupopenmethod'];

    function factory(viewSuccessStoriesService, Commondependency, alertss, fileUpload, modelpopupopenmethod) {

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

        model.viewStories = function(to) {
            model.toval = to;
            model.typeofAction = '';
            var inobj = {
                profileID: model.profileID ? model.profileID : null,
                Region: model.region,
                strCaste: model.caste ? model.caste.join(',') : null,
                strBranch: model.branch ? model.branch.join(',') : null,
                StartDate: model.fromDate ? moment(model.fromDate).format('YYYY-MM-DD hh:mm:ss') : null,
                EndDate: model.toDate ? moment(model.toDate).format('YYYY-MM-DD hh:mm:ss') : null,
                PageSize: 20,
                PageNumber: to,
                intlowerBound: 1,
                intUpperBound: 2,
                value: 1
            };

            viewSuccessStoriesService.viewSuccessStories(inobj).then(function(response) {
                if (response.data && response.data.length > 0) {
                    model.totalRows = response.data[0][0].TotalRows;
                    if (to > 1) {
                        model.viewSuccessArray = model.viewSuccessArray.concat(response.data[1]);
                    } else {
                        model.viewSuccessArray = response.data[1];
                    }
                }

            });
        };

        model.brideGroomChange = function(val, flag) {

            if (model.typeofAction === 'edit' && val) {
                viewSuccessStoriesService.getBrideGroomDatanew(val, flag).then(function(response) {
                    model.checkProfileID(response.data, flag);
                });
            } else if (val) {
                viewSuccessStoriesService.getBrideGroomData(val, flag).then(function(response) {
                    model.checkProfileID(response.data, flag);
                });
            }
        };

        model.checkProfileID = function(data, flag) {
            if (data) {
                switch (data.m_Item1) {
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
                if (data.m_Item1 === 1) {
                    if (flag === 1) {
                        model.brideName = data.m_Item2[3][0].PName;
                        model.brideCustID = data.m_Item2[3][0].Cust_ID;

                    } else if (flag === 2) {
                        model.groomName = data.m_Item2[3][0].PName;
                        model.groomCustID = data.m_Item2[3][0].Cust_ID;
                    }
                } else {
                    model.cleartxt(flag);
                }
            }

        };


        model.cleartxt = function(flag) {
            if (flag === 1) model.txtbrideprofileid = '';
            else if (flag === 2) model.txtgroomprofileid = '';
        };



        model.createSuccessStory = function() {
            var name = model.brideCustID + '_' + model.groomCustID + '_SuccessImage',
                keyname = '';
            if (model.myFileupload) {
                keyname = 'Images/SuccessStoryImages/' + name + '/' + name + '.' + ((model.myFileupload.name).split('.'))[1];
            } else if (model.SuccesStoryPhotoPath) {
                keyname = 'Images/SuccessStoryImages/' + name + '/' + name + '.jpg';
            }
            var inputobj = {
                EmpID: model.empid,
                BrideID: model.brideCustID,
                Bridename: model.brideName,
                GroomID: model.groomCustID,
                Groomname: model.groomName,
                StartDate: model.txtengagementdate ? moment(model.txtengagementdate).format('YYYY-MM-DD hh:mm:ss') : null,
                EndDate: model.txtmarriagedate ? moment(model.txtmarriagedate).format('YYYY-MM-DD hh:mm:ss') : null,
                Attachphoto: '~/' + keyname,
                SuccesSstory: model.txtsuccessstories,
                Displayinweb: model.rbtndisplay,
                flag: model.actionFlag,
                strSuccessstories: model.sucessStoryID
            };

            inputobj.flag = model.typeofAction === 'edit' ? 1 : 0;

            viewSuccessStoriesService.createSuccessStory(inputobj).then(function(response) {
                if (response.data === 1) {
                    var strdisplay = model.typeofAction === 'edit' ? 'SuccessStories Updated successfully' : 'SuccessStories created  successfully';
                    alertss.timeoutoldalerts(model.scope, 'alert-success', strdisplay, 4500);
                    if (model.myFileupload) {
                        fileUpload.uploadFileToUrl(model.myFileupload, '/dynamicUpload', keyname).then(function(res) {});
                    }
                    model.reset();
                    model.selectedIndex = 1;
                    model.scope.successstoriesform.$setPristine();
                }
            });
        };

        model.EditSuccessStories = function(row) {

            model.typeofAction = 'edit';
            model.txtbrideprofileid = row.BrideProfileID;
            model.txtgroomprofileid = row.GroomProfileID;
            model.brideGroomChange(model.txtbrideprofileid, 1);
            model.brideGroomChange(model.txtgroomprofileid, 2);
            model.rbtndisplay = JSON.stringify(row.DisplayInWeb);
            model.txtsuccessstories = row.Notes;
            model.txtmarriagedate = row.MarriageDate;
            model.txtengagementdate = row.EngagementDate;
            model.SuccesStoryPhotoPath = row.OriginalPhotoPath;
            model.sucessStoryID = row.CustId;
            model.selectedIndex = 0;
        };

        model.reset = function() {
            model.profileID = '';
            model.region = '';
            model.branch = [319, 320, 321, 322, 323, 324, 325, 326, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344];
            model.caste = ['402'];
            model.fromDate = '';
            model.toDate = '';
            model.brideName = '';
            model.groomName = '';
            model.txtbrideprofileid = '';
            model.txtgroomprofileid = '';
            model.txtengagementdate = '';
            model.txtmarriagedate = '';
            model.rbtndisplay = '';
            model.txtsuccessstories = '';
            model.typeofAction = '';
            model.SuccesStoryPhotoPath = '';
            model.sucessStoryID = '';
            model.dBrideProfileID = '';
            model.dGroomProfileID = '';
            model.dPhotoID = '';
        };


        $(function() {
            $('.scrollcls').on('scroll', function() {
                if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                    model.toval = model.toval + 1;
                    model.viewStories(model.toval);
                }
            });
        });

        model.delete = function(row) {
            model.dBrideProfileID = row.BrideProfileID;
            model.dGroomProfileID = row.GroomProfileID;
            model.dPhotoID = row.CustId;
            modelpopupopenmethod.showPopup('deletePhotoPopup.html', model.scope, 'sm', "addImg");
        };

        model.closepopup = function() {
            modelpopupopenmethod.closepopup();
        };

        model.deletefromS3 = function() {

            var name = model.brideCustID + '_' + model.groomCustID + '_SuccessImage',
                keynameq = '';

            keynameq = 'Images/SuccessStoryImages/' + name + '/' + name + '.jpg';
            http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

            });

            viewSuccessStoriesService.deleteSucessStory(model.dPhotoID, model.dBrideProfileID, model.dGroomProfileID).then(function(response) {
                if (response.data === 1) {
                    _.each(model.viewSuccessArray, function(item, index) {
                        if (model.dPhotoID === item.CustId)
                            model.viewSuccessArray.splice(index, 1);
                    });
                    model.closepopup();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', "SuccessStories deleted  successfully", 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', "SuccessStories deletion fail  successfully", 4500);
                }
            });
        };

        return model.init();

    }
})();